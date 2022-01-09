import * as React from "react"
import {useI18next} from 'gatsby-plugin-react-i18next';

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";

const BlogPage = () => {
    const {t} = useI18next();

    return (
        <Layout>
            <Seo title={t('i18n:blog')} />
            <h1>{t('i18n:blog')}</h1>
            <p>{t('i18n:blog:text')}</p>
        </Layout>
    )
}

export const query = graphql`
  query BlogPageQuery($language: String!) {
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

export default BlogPage
