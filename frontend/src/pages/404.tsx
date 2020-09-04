import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage: React.FC = (): void => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>Página não encontrada.</p>
    <Link to="/">Ir para o Início</Link> <br />
  </Layout>
)

export default NotFoundPage
