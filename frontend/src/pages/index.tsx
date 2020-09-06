import React, {useState, useEffect} from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage: React.FC = () => {
  const [timeStamp, setTimeStamp] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  async function sendGeoLocation() {
    const data = await fetch('/.netlify/fucntions/send-geo-location', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: timeStamp,
          lat: latitude,
          lon: longitude
        })
    })
    .then((res) => res.json())
    .catch((err) => console.error(err));
    alert(data)
  }

  useEffect(()=>{
    
    async function getLocation() {
      
      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          const { timestamp, coords: { latitude, longitude, accuracy, altitude} } = pos;
          resolve(pos);
          setTimeStamp(timestamp);
          setLatitude(latitude);
          setLongitude(longitude);
          // console.log(latitude, longitude);
        }, err => {
          reject(err);
        });

      });
    }

    getLocation();

  },[]);

  return (
  <Layout>
    <SEO title="Coronga Tracker" />
    <div style={{ maxWidth: `500px`, marginBottom: `1.45rem` }}>
    <button onClick={() => sendGeoLocation()} >Teste</button>
        {timeStamp + " "}
        {latitude + " "} {longitude}
      <Image />
    </div>
    {/* <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
  </Layout>
)};

export default IndexPage
