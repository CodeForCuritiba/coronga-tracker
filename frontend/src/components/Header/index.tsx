// import { Link } from "gatsby"
import React from "react"
// import Img, {GatsbyImageProps} from "gatsby-image"
import { Logo } from "./styles"

interface IHeader {
  siteTitle: string;
}

const Header = ({ siteTitle = `` }: IHeader) => (
  <header
    style={{
      background: `#F05600`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <Logo />
      {/* <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1> */}
    </div>
  </header>
)

export default Header
