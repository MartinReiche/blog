const path = require(`path`)
const {createFilePath} = require(`gatsby-source-filesystem`)
const {getBlogPath} = require(`./src/utils/getBlogPath`)

exports.createPages = async ({graphql, actions, reporter}) => {
  const {createPage} = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            frontmatter {
              path
              lang
              type
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes.filter(node => node.frontmatter.type === 'blog');

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    ['de', 'en'].map(lang => {
      const languageSpecificPosts = posts.filter(post => post.frontmatter.lang === lang);
      createMarkDownPages(languageSpecificPosts,blogPost,actions);
    });
  }
}

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }
    type Author {
      name: String
      summary: String
    }
    type Social {
      twitter: String
    }
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      path: String
      lang: String
      type: String
    }
  `)
}


function createMarkDownPages(items, component, actions) {
  const { createPage } = actions;
  items.forEach((item, index) => {

    const previousPostId = index === 0 ? null : items[index - 1].id
    const nextPostId = index === items.length - 1 ? null : items[index + 1].id

    createPage({
      path: getBlogPath(item.frontmatter, 'de'),
      component: component,
      context: {
        id: item.id,
        previousPostId,
        nextPostId,
      },
    })
  })
}
