async function getLocation() {
  return new Promise((resolve, reject) => {
    if(!("geolocation" in navigator)) {
      reject(new Error('Geolocation is not available.'));
    }

    navigator.geolocation.getCurrentPosition(pos => {
      const { timestamp, coords: { latitude, longitude, accuracy, altitude} } = pos;
      resolve(pos);
      console.log(latitude, longitude);
    }, err => {
      reject(err);
    });
  });
}