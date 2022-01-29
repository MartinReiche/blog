import * as React from "react"
import PropTypes, {InferProps} from "prop-types";
import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import {useTranslation} from "gatsby-plugin-react-i18next";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";
import Typography from "@mui/material/Typography";

function ImpressumPage({data}: InferProps<typeof ImpressumPage.propTypes>) {
    const {impressum, locales} = data
    const lang = locales.edges[0].node.language;
    const body = impressum.nodes.filter(node => node.slug.endsWith(lang)).map(node => node.body);

    const {t} = useTranslation();
    return (
        <Layout>
            <Seo title={t("i18n:impressum")}/>
            <Typography lang={lang} variant="h2" component="h1" color="primary" sx={{hyphens: 'auto'}}>
                {t("i18n:impressum")}
            </Typography>
            <MDXRenderer>
                {body[0]}
            </MDXRenderer>
        </Layout>
    )
}


export const query = graphql`
  query ImpressumPageQuery($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    impressum: allMdx(filter: {slug: {glob: "legal/impressum/*"}}) {
        nodes {
            slug        
            body
        }
    }
  }
`;

ImpressumPage.propTypes = {
    data: PropTypes.shape({
        impressum: PropTypes.shape({
            nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    slug: PropTypes.string.isRequired,
                    body: PropTypes.string.isRequired
                }).isRequired,
            ).isRequired,
        }).isRequired,
        locales: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node:
                    PropTypes.shape({
                        language: PropTypes.string.isRequired
                    }).isRequired
                }).isRequired
            ).isRequired
        }).isRequired
    }).isRequired
}

export default ImpressumPage
