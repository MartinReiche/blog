import * as React from "react"
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {GatsbyImage, getImage} from "gatsby-plugin-image"
// @ts-ignore
import {MDXProvider} from "@mdx-js/react"
import {MDXRenderer} from "gatsby-plugin-mdx";

import Layout from "../../components/layout"
import Seo from "../../components/layout/seo"
import {CombinedGallery, GridGallery, StepperGallery} from "../../components/gallery"
import {graphql} from "gatsby";
import PageNavigation from "../../components/page-navigation";
import ArticleInfo from "../../components/article-info";
import PropTypes, {InferProps, string} from "prop-types";
import {ImageDataLike} from 'gatsby-plugin-image'


const shortcodes = {CombinedGallery, GridGallery, StepperGallery};

export default function BlogPostTemplate({data}: InferProps<typeof BlogPostTemplate.propTypes>) {
    const {post, previous, next} = data
    const {title_image, gallery_images, description, title, date} = post.frontmatter;

    const image = title_image ? getImage(title_image as ImageDataLike) : null;
    const galleryImages = gallery_images ? gallery_images.map(image => {
        return getImage(image as ImageDataLike);
    }) : null;

    return (
        <Layout>
            <Seo
                title={title}
                description={description || post.excerpt}
            />
            <Box sx={{
                marginTop: (theme) => theme.spacing(5)
            }}>
                <article
                    className="blog-post"
                    itemScope
                    itemType="http://schema.org/Article"
                >
                    <header>
                        <PageNavigation previous={previous} next={next}/>
                        <Typography variant="h2" color="primary.dark" sx={{fontWeight: 'fontWeightBold'}}
                                    itemProp="headline">
                            {title}
                        </Typography>
                        {description && (
                            <Typography variant="h5" color="primary">
                                {description}
                            </Typography>
                        )}
                        <ArticleInfo date={date} />
                        {image && <GatsbyImage image={image} alt={title}/>}
                    </header>
                    {!image && <Divider/>}
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
            <PageNavigation previous={previous} next={next}/>
        </Layout>
    )
}

const AdjacentBlog = PropTypes.shape({
    frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: string.isRequired
    }).isRequired
});

const FrontMatter = PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    title_image: PropTypes.object,
    gallery_images: PropTypes.arrayOf(PropTypes.object)
});

BlogPostTemplate.propTypes = {
    data: PropTypes.shape({
        post: PropTypes.shape({
            excerpt: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            frontmatter: FrontMatter.isRequired
        }).isRequired,
        next: AdjacentBlog,
        previous: AdjacentBlog
    }).isRequired,
}


export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $language: String!
  ) {
    post: mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "dddd, Do MMMM YYYY", locale: $language)
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



