
  function addEventListeners() {
    console.log("...adding EventListeners");
    document.getElementById("js-getLocation").addEventListener("click", getLocationAndSaveInDB);
    // document.getElementById("js-openDB").addEventListener("click", openDb);
    document.getElementById("js-compareHistory").addEventListener("click", compareHistory);
  }

  window.onload = addEventListeners();
