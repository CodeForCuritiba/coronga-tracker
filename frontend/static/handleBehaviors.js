
  function addEventListeners() {
    console.log("...adding EventListeners");
    document.getElementById("js-getLocation").addEventListener("click", getLocation);
    document.getElementById("js-openDB").addEventListener("click", openDb);
  }

  window.onload = addEventListeners();
