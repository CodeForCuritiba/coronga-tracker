import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Coronga Tracker" />
    <div style={{ maxWidth: `500px`, marginBottom: `1.45rem` }}>
      <button id="js-getLocation" >Get Location 1</button>
      <div dangerouslySetInnerHTML={{ __html: '<button onclick="getLocation()" >Get Location 2</button>' }} />
      <a href="javascript:getLocation();">Get Location 3</a>
      <button id="js-openDB" >Get Location 1</button>
      <div id="js-render-location"></div>
      <Image />
    </div>
    {/* <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
  </Layout>
);

export default IndexPage
