import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {useTranslation} from "gatsby-plugin-react-i18next";
import {graphql} from "gatsby";

const SupportPage = () => {
    const {t} = useTranslation();
    return (
        <Layout>
            <Seo title={t("i18n:support")} />
        </Layout>
    )
}


export const query = graphql`
  query SupportPageQuery($language: String!) {
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

export default SupportPage
