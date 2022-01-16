import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {useTranslation} from "gatsby-plugin-react-i18next";
import {graphql} from "gatsby";

const ImpressumPage = () => {
    const {t} = useTranslation();
    return (
        <Layout>
            <Seo title={t("i18n:impressum")} />
            <h1>{t('i18n:impressum')}</h1>
            <p>{t('i18n:impressum:text')}</p>
        </Layout>
    )
}


export const query = graphql`
  query ImpressumPageQuery($language: String!) {
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

export default ImpressumPage
