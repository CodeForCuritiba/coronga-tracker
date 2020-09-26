import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Página não encontrada</h1>
    <p>Essa página não existe, nos desculpe</p>
    <Link to="/">Voltar para o Início</Link>
  </Layout>
)

export default NotFoundPage
