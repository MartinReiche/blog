import * as React from "react"
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {GatsbyImage, getImage} from "gatsby-plugin-image"
// @ts-ignore
import {MDXProvider} from "@mdx-js/react"
import {MDXRenderer} from "gatsby-plugin-mdx";

import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import Link from "../components/link"
import Gallery from "../components/gallery";
import {graphql} from "gatsby";

type BlogPostTemplateProps = {
    data: DataType;
}

const shortcodes = {Gallery};

const BlogPostTemplate = ({ data }: BlogPostTemplateProps) => {
    const {post, previous, next} = data

    const image = getImage(post.frontmatter.title_image)
    const galleryImages = post.frontmatter.gallery_images?.map(image => {
        return getImage(image);
    });

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
                        <Typography variant="h2" color="primary.dark" sx={{fontWeight: 'fontWeightBold'}}
                                    itemProp="headline">
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
                        {/* Implement Social Media Share Buttons */}
                        {/*<TwitterShareButton*/}
                        {/*    title={post.frontmatter.title}*/}
                        {/*    url={canonicalUrl}*/}
                        {/*>*/}
                        {/*    <TwitterIcon />*/}
                        {/*</TwitterShareButton>*/}
                        {image && <GatsbyImage image={image} alt={post.frontmatter.title}/>}
                    </header>
                    <Divider/>
                    <section itemProp="articleBody">
                        <Box sx={{textAlign: 'justify'}}>
                            <MDXProvider components={shortcodes}>
                                <MDXRenderer galleryImages={galleryImages}>
                                    {post.body}
                                </MDXRenderer>
                            </MDXProvider>
                        </Box>
                    </section>
                    <Divider/>
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
        siteUrl
      }
    }
    post: mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        path
        lang
        title_image {
          childImageSharp {
            gatsbyImageData(
              width: 900
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        gallery_images {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      frontmatter {
        title
        path
        lang
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
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
    body: string;
    frontmatter: {
        title: string;
        date: string;
        description: string;
        path: string;
        lang: string;
        title_image: any
        gallery_images: any[]
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

