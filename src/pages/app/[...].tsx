import React from "react";
import {Router} from "@reach/router";
import Login from "../../components/login";
import {graphql} from "gatsby";

const App = () => {

    return (
        <React.Fragment>
            <Router>
                <Login path="/app/login"/>
            </Router>
        </React.Fragment>
    )
}

export default App

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

