import * as React from "react"
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Martin Reiche - Blog</h1>

  </Layout>
)

export const query = graphql`
  query HomePageQuery($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default IndexPage
