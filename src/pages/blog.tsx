import * as React from "react"
import {useI18next} from 'gatsby-plugin-react-i18next';

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";
import Link from '../components/link';

const BlogPage: React.FC<QueryData> = ({data}) => {
    const {t} = useI18next();

    const postData = data.blog.nodes.map(post => {
        const { path, title } = post.frontmatter;
        return { path , title }
    });

    return (
        <Layout>
            <Seo title={t('i18n:blog')}/>
            <h1>{t('i18n:blog')}</h1>
            <p>{t('i18n:blog:text')}</p>

            <ul>
                {postData.map(post => {
                    return (
                        <li key={post.path}>
                            <Link to={post.path}>
                                {post.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
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
    blog: allMdx(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {
        frontmatter: {
            lang: {eq: $language}, 
            type: {eq: "blog"}
            }
        }
    ) {
    nodes {
      id
      timeToRead
      excerpt
      frontmatter {
        date
        title
        path
        lang
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      } 
    }
    }
  }
`;

type QueryData = {
    data: {
        blog: {
            nodes: {
                id: string,
                timeToRead: number;
                excerpt: string;
                frontmatter: {
                    date: string;
                    description: string;
                    lang: string;
                    path: string;
                    title: string;
                }
            }[]
        }
    }
}

export default BlogPage
