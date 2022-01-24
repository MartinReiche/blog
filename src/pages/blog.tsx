import * as React from "react"
import {useTranslation} from 'gatsby-plugin-react-i18next';

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";
import BlogCard from "../components/blog/blogCard";
import {Stack} from "@mui/material";
import {ImageDataLike} from "gatsby-plugin-image";

type BlogData = {
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
                    title_image: ImageDataLike;
                }
            }[]
        }
    }
}

const BlogPage: React.FC<BlogData> = ({data}) => {
    const {t} = useTranslation();

    const postData = data.blog.nodes.map(post => {
        const { excerpt } = post;
        const { path, title, date, description, title_image } = post.frontmatter;
        return { path , title, description, date, excerpt, title_image }
    });

    return (
        <Layout>
            <Seo title={t('i18n:blog')} />
            <Stack spacing={2}>
                {postData.map((post, i) => (
                    <BlogCard key={i} blogData={post}/>
                ))}
            </Stack>
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
      excerpt(pruneLength: 500)
      frontmatter {
        date(formatString: "dddd, Do MMMM YYYY", locale: $language)
        title
        path
        lang
        description
        title_image {
          title
          src {
            childImageSharp {
              gatsbyImageData(
                width: 900
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
    }
  }
`;


export default BlogPage
