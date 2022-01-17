import * as React from "react"
import { Router } from "@reach/router"
import Login from "../../components/login"
import {graphql} from "gatsby";

const App = () => (
  <React.Fragment>
    <Router>
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

export default App
