import * as React from "react"
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {graphql} from "gatsby";
import BlogCard from "../components/blog/blogCard";
import {Stack} from "@mui/material";
import {ImageDataLike} from "gatsby-plugin-image";
import {getI18nPathFromSlug} from "../utils";

type BlogData = {
    data: {
        blog: {
            nodes: {
                id: string,
                timeToRead: number;
                excerpt: string;
                slug: string;
                frontmatter: {
                    date: string;
                    description: string;
                    title: string;
                    title_image: ImageDataLike;
                }
            }[]
        }
    }
}

const BlogPage: React.FC<BlogData> = ({data}) => {
    const {t} = useTranslation();
    const {language} = useI18next();

    const postData = data.blog.nodes.filter(({slug}) => {
        const [,,lang] = slug.split('/');
        return lang === language;
    }).map(post => {
            const {excerpt, slug} = post;
            return { ...post.frontmatter, excerpt, path: getI18nPathFromSlug(slug)}
        });

    return (
        <Layout>
            <Seo title={t('i18n:blog')}/>
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
      filter: {slug: {glob: "blog/**"}}
    ) {
    nodes {
      id
      timeToRead
      excerpt(pruneLength: 500)
      slug
      frontmatter {
        date(formatString: "dddd, Do MMMM YYYY", locale: $language)
        title
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
