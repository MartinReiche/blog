import * as React from "react"
import {graphql, Link} from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type BlogPostTemplateProps = {
    data: DataType;
}

const BlogPostTemplate = ({data }: BlogPostTemplateProps) => {
    const post = data.markdownRemark
    // const siteTitle = data.site.siteMetadata?.title || `Title`
    const {previous, next} = data

    return (
        <Layout>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 itemProp="headline">{post.frontmatter.title}</h1>
                    <p>{post.frontmatter.date}</p>
                </header>
                <section
                    dangerouslySetInnerHTML={{__html: post.html}}
                    itemProp="articleBody"
                />
                <hr/>
            </article>
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
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
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
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        type
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
type DataType = {
    site: SiteType;
    markdownRemark: BlogType;
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
    }
}

type PageType = {
    fields: {
        slug: any
    },
    frontmatter: {
        title: string;
    }
}

type SiteType = {
    siteMetadata: {
        title: string;
    }
}