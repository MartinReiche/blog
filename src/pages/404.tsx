import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export const query = graphql`
  query NotFoundPageQuery($language: String!) {
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

export default NotFoundPage
