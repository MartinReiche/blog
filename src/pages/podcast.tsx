import * as React from "react"
import {useTranslation} from 'gatsby-plugin-react-i18next';

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";

const PodcastPage = () => {
    const {t} = useTranslation();

    return (
        <Layout>
            <Seo title={t('i18n:podcast')} />
        </Layout>
    )
}

export const query = graphql`
  query PodcastPageQuery($language: String!) {
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

export default PodcastPage
