import * as React  from "react"
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {MDXRenderer} from "gatsby-plugin-mdx";

import Layout from "../../components/layout"
import Seo from "../../components/layout/seo"
import {graphql} from "gatsby";
import PageNavigation from "../../components/page-navigation";
import ArticleInfo from "../../components/article-info";
import MDXProvider from "../../components/mdx-provider";
import PropTypes, {InferProps, string} from "prop-types";

export default function BlogPostTemplate({data}: InferProps<typeof BlogPostTemplate.propTypes>) {
    const {post, previous, next} = data
    const {title_image, gallery_images, description, title, date} = post.frontmatter;

    const image = title_image ? getImage(title_image.src) : null;

    return (
        <Layout>
            <Seo
                title={title}
                description={description || post.excerpt}
                image={image}
                article={true}
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
                        <Typography variant="h2" component="h1" color="primary.dark" sx={{fontWeight: 'fontWeightBold'}}
                                    itemProp="headline">
                            {title}
                        </Typography>
                        {description && (
                            <Typography variant="h5" component="h2" color="primary">
                                {description}
                            </Typography>
                        )}
                        <ArticleInfo date={date} title={title} description={description} />
                        {image && <GatsbyImage image={image} alt={title}/>}
                    </header>
                    {!image && <Divider/>}
                    <section itemProp="articleBody">
                        <Box sx={{textAlign: 'justify'}}>
                            <MDXProvider>
                                <MDXRenderer galleryImages={gallery_images} test={"Test Props privided in MDXRenderer"}>
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

const Image = PropTypes.shape({
    title: string,
    src: PropTypes.any
})

const FrontMatter = PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    title_image: Image,
    gallery_images: PropTypes.arrayOf(Image)
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



