import * as React from "react"
import { Router } from "@reach/router"
import Login from "../../components/login"
import AdminRoute from "../../components/admin-route";
import NewComments from "../../components/new-comments";
import {graphql} from "gatsby";

const Path = () => (
  <React.Fragment>
    <Router>
        <AdminRoute component={NewComments} path="/app/new-comments" />
      <Login path="/app/login" />
      <Login path="/:lang/app/login" />
    </Router>
  </React.Fragment>
)

export const query = graphql`
  query AppPageQuery($language: String!) {
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

export default Path
