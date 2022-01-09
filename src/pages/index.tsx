import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {useI18next} from "gatsby-plugin-react-i18next";
import {graphql} from "gatsby";

const IndexPage = () => {
    const {t} = useI18next();
    return (
        <Layout>
            <Seo title="Home"/>
            <h1>Martin Reiche</h1>
            <p>{t('i18n:home:text')}</p>
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
