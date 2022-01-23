import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";

const IndexPage = () => {
    return (
        <Layout>
            <Seo title="Home" />
        </Layout>
    )
}


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
