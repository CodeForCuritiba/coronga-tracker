function getLocation() {
    return new Promise((resolve, reject) => {
      if(!("geolocation" in navigator)) {
        reject(new Error('Geolocation is not available.'));
      }
  
      navigator.geolocation.getCurrentPosition(pos => {
        const renderLocations = document.getElementById('js-render-location');
        const { timestamp, coords: { latitude, longitude, accuracy, altitude} } = pos;
        resolve(pos);
        renderLocations.innerHTML=' '+latitude+" "+ longitude;
        console.log(latitude, longitude);
      }, err => {
        reject(err);
      });
    });
}
