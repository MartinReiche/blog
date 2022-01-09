import * as React from "react"
import {graphql} from "gatsby"
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import Link from "../components/link"

type BlogPostTemplateProps = {
    data: DataType;
}

const BlogPostTemplate = ({data}: BlogPostTemplateProps) => {
    const {post, previous, next} = data

    const image = getImage(post.frontmatter.featuredImage)

    return (
        <Layout>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <Box sx={{
                marginTop: (theme) => theme.spacing(8)
            }}>
                <article
                    className="blog-post"
                    itemScope
                    itemType="http://schema.org/Article"
                >
                    <header>
                        <Typography variant="h2" color="primary.dark" sx={{ fontWeight: 'fontWeightBold'}} itemProp="headline">
                            {post.frontmatter.title}
                        </Typography>
                        {post.frontmatter.description && (
                            <Typography variant="h5" color="primary">
                                {post.frontmatter.description}
                            </Typography>
                        )}
                        <Typography>
                            {post.frontmatter.date}
                        </Typography>
                        {image && <GatsbyImage image={image} alt={post.frontmatter.title} />}
                    </header>
                    <Divider />
                    <section
                        dangerouslySetInnerHTML={{__html: post.html}}
                        itemProp="articleBody"
                    />
                    <Divider />
                </article>
            </Box>

            <nav className="blog-post-nav">
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.frontmatter.path} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.frontmatter.path} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $language: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        path
        lang
        featuredImage {
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      frontmatter {
        title
        path
        lang
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      frontmatter {
        title
        path
        lang
      }
    }
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
`
type DataType = {
    site: SiteType;
    post: BlogType;
    previous: PageType;
    next: PageType;
}

type BlogType = {
    id: string;
    excerpt: string;
    html: string;
    frontmatter: {
        title: string;
        date: string;
        description: string;
        path: string;
        lang: string;
        featuredImage: any
    }
}

type PageType = {
    fields: {
        slug: any
    },
    frontmatter: {
        title: string;
        path: string;
        lang: string;
    }
}

type SiteType = {
    siteMetadata: {
        title: string;
    }
}