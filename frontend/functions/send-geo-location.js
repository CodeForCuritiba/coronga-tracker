const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { timestamp, lat, long} = JSON.parse(event.body);
  const response = await fetch('http://127.0.0.1/',
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp,
      lat,
      long,
    })
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};