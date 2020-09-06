/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
interface ILayout {
  children: Node;
}

const Layout: React.FC = ({ children }:ILayout) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          padding: `0`,
          maxHeight: `100vh`,
          width:`100vw`,
          display: `flex`,
          flexDirection: `column`
        }}
      >
        <Header siteTitle={data.site.siteMetadata.title} />
        <main
        style={{
          flex: 1,
          overflowY: `auto`,
          
        }}
        >{children}</main>
        <footer>
        © {new Date().getFullYear()}, Feito com 💚 no
          {` `}
          <a href="https://www.codeforcuritiba.org/">Code For Curitia.</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
