import * as React from "react"
import PropTypes, {InferProps, string} from "prop-types";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {MDXRenderer} from "gatsby-plugin-mdx";
import {graphql} from "gatsby";

import Layout from "../../components/layout"
import Seo from "../../components/layout/seo"
import PageNavigation from "../../components/blog/pageNavigation";
import ArticleInfo from "../../components/article-info";
import MDXProvider from "../../components/mdx-provider";
import Comments from "../../components/comments";
import {getI18nPathFromSlug} from "../../utils";

export default function BlogPostTemplate({data}: InferProps<typeof BlogPostTemplate.propTypes>) {
    const {post, previous, next} = data
    const {title_image, gallery_images, description, title, date} = post.frontmatter;

    const image = title_image ? getImage(title_image.src) : null;

    const nextPost = next && {
        title: next.frontmatter.title,
        path: getI18nPathFromSlug(next.slug)
    }
    const previousPost = previous && {
        title: previous.frontmatter.title,
        path: getI18nPathFromSlug(previous.slug)
    }

    return (
        <Layout>
            <Seo
                title={title}
                description={description || post.excerpt}
                image={title_image?.src}
                article={true}
            />
            <Box>
                <article
                    className="blog-post"
                    itemScope
                    itemType="http://schema.org/Article"
                >
                    <header>
                        <PageNavigation previous={previousPost} next={nextPost}/>
                        <Typography
                            variant="h2"
                            component="h1"
                            color="primary"
                            sx={{my: 1}}
                            itemProp="headline"
                        >
                            {title}
                        </Typography>
                        {description && (
                            <Typography variant="h5" component="h2" color="text.secondary">
                                {description}
                            </Typography>
                        )}

                        <ArticleInfo date={date} title={title} description={description}/>
                        {image && <GatsbyImage image={image} alt={title}/>}
                    </header>
                    {!image && <Divider/>}
                    <section itemProp="articleBody">
                        <MDXProvider>
                            <MDXRenderer galleryImages={gallery_images}>
                                {post.body}
                            </MDXRenderer>
                        </MDXProvider>
                    </section>
                    <PageNavigation previous={previousPost} next={nextPost}/>
                    <Divider sx={{ my: 2}}/>
                    <Comments documentId={post.slug.replace(/\//g, "-")} collectionName="blog" title={title}/>
                </article>
            </Box>

        </Layout>
    )
}

const AdjacentBlog = PropTypes.shape({
    frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    slug: PropTypes.string.isRequired
});

const Image = PropTypes.shape({
    title: string,
    src: PropTypes.any
})

const FrontMatter = PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title_image: Image,
    gallery_images: PropTypes.arrayOf(Image)
});

BlogPostTemplate.propTypes = {
    data: PropTypes.shape({
        post: PropTypes.shape({
            excerpt: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            frontmatter: FrontMatter.isRequired,
            slug: PropTypes.string.isRequired
        }).isRequired,
        next: AdjacentBlog,
        previous: AdjacentBlog
    }).isRequired,
}


export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousId: String
    $nextId: String
    $language: String!
  ) {
    post: mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      slug
      frontmatter {
        title
        date(formatString: "dddd, Do MMMM YYYY", locale: $language)
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
        gallery_images {
          title
          src {
            childImageSharp {
              gatsbyImageData
            }          
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousId }) {
      frontmatter {
        title
      }
      slug
    }
    next: mdx(id: { eq: $nextId }) {
      frontmatter {
        title
      }
      slug
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



