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

const API_URL = 'https://hxf2nx257b.execute-api.sa-east-1.amazonaws.com/prod/history';

var db;

// Used to keep track of which view is displayed to avoid uselessly reloading it
var current_view_pub_key;

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
  var store = getObjectStore(DB_STORE_NAME, 'readwrite');
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
  console.log("addCoordinates arguments:", arguments);
    var obj = { locationid, timestamp, latitude, longitude };

    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;
    try {
      req = store.add(obj);
    } catch (e) {
      if (e.name == 'DataCloneError')
        console.log("This engine doesn't know how to clone a Blob, " +
                             "use Firefox");
      throw e;
    }
    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
    };
    req.onerror = function() {
      console.error("addPublication error", this.error);
    };
}

function saveCheckPoint(locationid, timestamp, latitude, longitude) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(API_URL, {
    method:'POST',
    headers: myHeaders,
    body: {
          id: locationid,
          latitude,
          longitude,
          timestamp
      }
  }).then(res => {
    console.log(res.json());
  });
}