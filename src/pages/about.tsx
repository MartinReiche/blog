import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";
import {useTranslation} from 'gatsby-plugin-react-i18next';

const AboutPage = () => {
    const {t} = useTranslation();
    return (
        <Layout>
            <Seo title={t('i18n:about')}  />
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
