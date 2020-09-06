(function(){
  const btnGetLocation = document.getElementById('js-getLocation');
  function addEventListeners() {
    console.log("addEventListeners");
    btnGetLocation.click(function(){getLocation()});
  }
  addEventListeners();
})();