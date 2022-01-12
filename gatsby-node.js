const path = require(`path`)

exports.createPages = async ({graphql, actions, reporter}) => {

  console.log("\n!!!!!!!!!!!!!! TEST !!!!!!!!!!!!!!!!!")
  console.log(process.env.SITE_URL)
  console.log("!!!!!!!!!!!!!! TEST !!!!!!!!!!!!!!!!!\n")


  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blogPost/index.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(
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

  const posts = result.data.allMdx.nodes.filter(node => node.frontmatter.type === 'blog');

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL


  if (posts.length > 0) {
    ['de', 'en'].map(lang => {
      const languageSpecificPosts = posts.filter(post => post.frontmatter.lang === lang);
      createMdxPages(languageSpecificPosts,blogPost,actions);
    });
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
      siteUrl: String
    }
    type Author {
      name: String
      summary: String
    }
    type Social {
      twitter: String
    }
    type Mdx implements Node {
      frontmatter: FrontMatter
    }
    type FrontMatter {
      title: String
      description: String
      date: Date @dateformat
      path: String
      lang: String
      type: String
      title_image: File @fileByRelativePath
      gallery_images: [File] @fileByRelativePath
    }
  `)
}


function createMdxPages(items, component, actions) {
  const { createPage } = actions;
  items.forEach((item, index) => {

    const previousPostId = index === 0 ? null : items[index - 1].id
    const nextPostId = index === items.length - 1 ? null : items[index + 1].id

    createPage({
      path: getI18nPath(item.frontmatter, 'de'),
      component: component,
      context: {
        id: item.id,
        previousPostId,
        nextPostId,
      },
    })
  })
}


const getI18nPath = (frontMatter, defaultLang) => {
  if (defaultLang === frontMatter.lang) {
    return `${frontMatter.path}`;
  } else {
    return `/${frontMatter.lang}${frontMatter.path}`;
  }
};