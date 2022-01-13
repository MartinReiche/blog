import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {useI18next} from "gatsby-plugin-react-i18next";
import {graphql} from "gatsby";

const ImpressumPage = () => {
    const {t, language} = useI18next();
    return (
        <Layout>
            <Seo title={t("i18n:impressum")} language={language}/>
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
