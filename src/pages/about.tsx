import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";
import {useI18next} from 'gatsby-plugin-react-i18next';

const AboutPage = () => {
    const {t, language} = useI18next();
    return (
        <Layout>
            <Seo title={t('i18n:about')} language={language} />
            <h1>{t('i18n:about')}</h1>
            <p>{t('i18n:about:text')}</p>
        </Layout>
    )
}

export const query = graphql`
  query AboutPageQuery($language: String!) {
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

export default AboutPage
