//REF: https://developer.mozilla.org/pt-BR/docs/Web/API/IndexedDB_API/Usando_IndexedDB

// Na linha abaixo, você deve incluir os prefixos do navegador que você vai testar.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// Não use "var indexedDB = ..." se você não está numa function.
// Posteriormente, você pode precisar de referências de algum objeto window.IDB*:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla nunca usou prefixo nesses objetos, então não precisamos window.mozIDB*)


if (!window.indexedDB) {
  window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
}


const DB_NAME = 'coronga-tracker';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'geolocation';

const API_URL = 'https://coronga.free.beeceptor.com/history';

var db;

function openDb() {
  console.log("openDb ...");
  var req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onsuccess = function (evt) {
    // Better use "this" than "req" to get the result to avoid problems with
    // garbage collection.
    // db = req.result;
    db = this.result;
    console.log("openDb DONE");
  };
  req.onerror = function (evt) {
    console.error("openDb:", evt.target.errorCode);
  };

  req.onupgradeneeded = function (evt) {
    console.log("openDb.onupgradeneeded");
    var store = evt.currentTarget.result.createObjectStore(
      DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
    
    store.createIndex('locationid', 'locationid', { unique: true });
    store.createIndex('timestamp', 'timestamp', { unique: false });
    store.createIndex('latitude', 'latitude', { unique: false });
    store.createIndex('longitude', 'longitude', { unique: false });
  };
}

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(store_name, mode) {
  var tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}

function clearObjectStore(store_name) {
  var store = getObjectStore(store_name, 'readwrite');
  var req = store.clear();
  req.onsuccess = function(evt) {
    displayActionSuccess("Store cleared");
    displayPubList(store);
  };
  req.onerror = function (evt) {
    console.error("clearObjectStore:", evt.target.errorCode);
    displayActionFailure(this.error);
  };
}


/**
   * @param {string} locationid
   * @param {Date} timestamp
   * @param {number} latitude
   * @param {number} longitude
   */

function addCoordinates(locationid, timestamp, latitude, longitude) {
    var obj = { locationid, timestamp, latitude, longitude };
    console.log("addCoordinates arguments:", obj);

    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;
    try {
      req = store.add(obj);
    } catch (e) {
      throw e;
    }
    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
    };
    req.onerror = function() {
      console.error("addPublication error", this.error);
    };
}

function compareHistory() {
  var store = getObjectStore(DB_STORE_NAME, 'readonly');
  var req;
  req = store.count();
  // Requests are executed in the order in which they were made against the
  // transaction, and their results are returned in the same order.


  req.onsuccess = function(evt) {
    console.log('There are ', evt.target.result)
  }

  req.onerror = function(evt) {
    console.error('add error', this.error);
  };

  var listHistory = [];
  var i =0;
  req = store.openCursor();
  req.onsuccess = function(evt) {
    var cursor = evt.target.result;
    // If the cursor is pointing at something, ask for the data
    if (cursor) {
      console.log("list cursor:", cursor);
      req = store.get(cursor.key);
      req.onsuccess = function (evt) {
        var value = evt.target.result;
        console.log('KEY', cursor.key);
        console.log('locationid', value.locationid);
        console.log('timestamp', value.timestamp);
        console.log('latitude', value.latitude);
        console.log('longitude', value.longitude);
        listHistory.push({
          "locationid" : value.locationid,
          "timestamp": value.timestamp,
          "latitude": value.latitude,
          "longitude": value.longitude
        });
        console.log('list',  listHistory);
      };

      // Move on to the next object in store
      cursor.continue();

      // This counter serves only to create distinct ids
      i++;
    } else {
      console.log("No more entries");

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var data = JSON.stringify({ data: listHistory });
      // console.log('list',  listHistory);
      fetch(API_URL, {
        method:'POST',
        headers: myHeaders,
        body: data,
      }).then(res => {
        console.log(res.json());
      }).catch(err => {
        console.log(err);
      });

    }
  };
  
}