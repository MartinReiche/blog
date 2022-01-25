const path = require(`path`)
const {getI18nPathFromSlug} = require('./src/utils/getI18nPath');


// workaround for i18n prefixes on catchall client-only routes
function langPrefix(page) {
  return page.context.language === page.context.i18n.defaultLanguage &&
  !page.context.i18n.generateDefaultLanguagePage
    ? ''
    : `/${page.context.language}`
}

exports.onCreatePage = ({page, actions}) => {
  const {createPage} = actions
  // Removing the ^ skips an optional /:lang prefix
  if (page.path.match(/\/app/)) {
    // adding lang if it's not the default page.
    page.matchPath = `${langPrefix(page)}/app/*`
    createPage(page)
  }
}

exports.createPages = async ({graphql, actions, reporter}) => {

  // Load components
  const components = {
    blog: path.resolve(`./src/templates/blogPost/index.tsx`),
    blogList: path.resolve(`./src/templates/blogList/index.tsx`)
  }

  // Get all markdown entries sorted by date
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            slug
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

  const pages = result.data.allMdx.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  if (pages.length > 0) {
    ['de', 'en'].map(currentLang => {
      const pagesPerLang = pages
        .map(page => ([...page.slug.split('/'), page.id, page.slug]))
        .map(([type, entryId, lang, id, slug]) => ({type, entryId, lang, id, slug}))
        .filter(({lang}) => lang === currentLang)

      pagesPerLang
        .map(page => ({...page, path: getI18nPathFromSlug(page.slug, 'de')}))
        .map((page, i) => ({...page, previousId: i === 0 ? null : pagesPerLang[i - 1].id}))
        .map((page, i) => ({...page, nextId: i === pagesPerLang.length - 1 ? null : pagesPerLang[i + 1].id}))
        .forEach(({id, previousId, nextId, path, type}) => {
          // createMdxPages();
          actions.createPage({
            path,
            component: components[type],
            context: {id, previousId, nextId},
          })
        });
    });
  }
  // create blog list pages per language
  const postsPerPage = 3;
  ['de', 'en'].map(currentLang => {
    const pagesPerLang = pages
      .map(page => ([...page.slug.split('/'), page.id, page.slug]))
      .map(([type, entryId, lang, id, slug]) => ({type, entryId, lang, id, slug}))
      .filter(({lang}) => lang === currentLang);

    const numPages = Math.ceil(pagesPerLang.length / postsPerPage);

    Array.from({length: numPages}).forEach((_, i) => {
      actions.createPage({
        path: i === 0 ? getI18nPathFromSlug(`blog/${currentLang}`)
          : getI18nPathFromSlug(`blog/${i + 1}/${currentLang}`),
        component: components['blogList'],
        context: {
          slugGlobFilter: `blog/**/${currentLang}`,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    });

  });

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
      siteUrl: String,
      twitterUsername: String,
      image: String
      description: Description
    }
    type Description {
      de: String
      en: String
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
      title_image: Image
      gallery_images: [Image] 
    }
    type Image {
      src: File @fileByRelativePath
      title: String
    }
  `)
}

