import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/layout/seo"
import Box from '@mui/material/Box';
import {graphql} from "gatsby";
const IndexPage = () => {
    return (
        <Layout>
            <Seo title="Home" />
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>

            </Box>
        </Layout>
    )
}


export const query = graphql`
  query HomePageQuery($language: String!) {
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
`;

export default IndexPage
