import React from "react"
import PropTypes, {InferProps} from "prop-types"
import {Helmet} from "react-helmet"
import {useLocation} from "@reach/router"
import {useStaticQuery, graphql} from "gatsby"

function SEO({title, description, image, article, language}: InferProps<typeof SEO.propTypes>) {
    const {pathname} = useLocation()
    const {site, defaultImage} = useStaticQuery(query)

    const {
        defaultTitle,
        defaultDescription,
        siteUrl,
        twitterUsername,
    } = site.siteMetadata
    image = image || defaultImage;

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image?.childImageSharp.gatsbyImageData.images.fallback.src}`,
        url: `${siteUrl}${pathname}`,
    }

    return (
        <Helmet
            title={seo.title} titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
            htmlAttributes={{
                lang: language,
            }}
        >
            <meta name="description" content={seo.description}/>
            <meta name="image" content={seo.image}/>
            {seo.url && <meta property="og:url" content={seo.url}/>}
            {(article ? true : null) && <meta property="og:type" content="article"/>}
            {seo.title && <meta property="og:title" content={seo.title}/>}
            {seo.description && (
                <meta property="og:description" content={seo.description}/>
            )}
            {seo.image && <meta property="og:image" content={seo.image}/>}
            <meta name="twitter:card" content="summary_large_image"/>
            {twitterUsername && (
                <meta name="twitter:creator" content={twitterUsername}/>
            )}
            {seo.title && <meta name="twitter:title" content={seo.title}/>}
            {seo.description && (
                <meta name="twitter:description" content={seo.description}/>
            )}
            {seo.image && <meta name="twitter:image" content={seo.image}/>}
        </Helmet>
    )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
        twitterUsername
      }
    }
    defaultImage: file(relativePath: {eq: "banner.png"}) {
        id
        childImageSharp {
          gatsbyImageData
        }
    }
  }
`

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.any,
    article: PropTypes.bool,
    language: PropTypes.any
}

SEO.defaultProps = {
    title: null,
    description: null,
    image: null,
    article: false,
    language: 'de'
}