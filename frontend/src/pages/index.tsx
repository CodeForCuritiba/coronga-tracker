import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import Image from "../components/Image"
import SEO from "../components/Seo"

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Coronga Tracker" />
    <div style={{ maxWidth: `500px`, marginBottom: `1.45rem`, width: '100%' }}>
      <button id="js-getLocation" >Get Location 1</button>
      {/* <button id="js-openDB" >Open DB</button> */}
      <button id="js-compareHistory" >Compare History</button>
      <div id="js-render-location"></div>
      {/* <Image /> */}
    </div>
  </Layout>
);

export default IndexPage
