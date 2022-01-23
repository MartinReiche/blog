require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

const DESCRIPTION_DE = "Ein Blog über experimentelle Gedanken, nachhaltiges Reisen und alternative Lebensformen";
const DESCRIPTION_EN = "A blog about Experimental thoughts, sustainable travel and alternative lifeforms";

module.exports = {
  siteMetadata: {
    title: `Martin Reiche`,
    description: {
      de: DESCRIPTION_DE,
      en: DESCRIPTION_EN
    },
    author: {
      name: `Martin Reiche`,
      summary: `Long range cycle enthusiast in search for meaning`
    },
    siteUrl: `${process.env.SITE_URL}`,
    twitterUsername: "@martin_reiche",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `de`],
        defaultLanguage: `de`,
        siteUrl: `${process.env.SITE_URL}`,
        i18nextOptions: {
          interpolation: {
            escapeValue: false
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
          {
            matchPath: '/:lang?/blog/:uid',
            getLanguageFromPath: true,
          },
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Martin Reiche`,
        short_name: `Martin Reiche`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-theme-material-ui`,
       options: {
        webFontsConfig: {
          fonts: {
            google2: [
              {
                family: "Playfair Display",
                axes: "wght@700",
              },
              {
                family: "Montserrat",
                axes: "wght@400;500;700",
              },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({query: {site, allMdx}}) => {
              return allMdx.nodes
                .filter(node => node.frontmatter.type === "blog" && node.frontmatter.lang === "de")
                .map(node => {
                  return Object.assign({}, node.frontmatter, {
                    description: node.excerpt,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.frontmatter.path,
                    guid: site.siteMetadata.siteUrl + node.frontmatter.path,
                    custom_elements: [{"content:encoded": node.html}],
                  })
                })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    frontmatter {
                      title
                      date(formatString: "dddd, Do MMMM YYYY", locale: "de")
                      path
                      lang
                      type
                    }
                  }
                }
              }
            `,
            output: "/blog/rss.xml",
            title: `Martin Reiche | ${DESCRIPTION_DE}`,
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // link: "https://feeds.feedburner.com/gatsby/blog",
          },
          {
            serialize: ({query: {site, allMdx}}) => {
              return allMdx.nodes
                .filter(node => node.frontmatter.type === "blog" && node.frontmatter.lang === "en")
                .map(node => {
                  return Object.assign({}, node.frontmatter, {
                    description: node.excerpt,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.frontmatter.path,
                    guid: site.siteMetadata.siteUrl + node.frontmatter.path,
                    custom_elements: [{"content:encoded": node.html}],
                  })
                })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    frontmatter {
                      title
                      date(formatString: "dddd, Do MMMM YYYY", locale: "en")
                      path
                      lang
                      type
                    }
                  }
                }
              }
            `,
            output: "/en/blog/rss.xml",
            title: `Martin Reiche | ${DESCRIPTION_DE}`,
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/en/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ],
}

