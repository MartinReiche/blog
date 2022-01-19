import * as React from "react"
import {Router} from "@reach/router"
import Login from "../../components/login"
import AdminGate from "../../components/route-gates/admin-gate";
import Dashboard from "../../components/dashboard";
import {graphql} from "gatsby";

const Path = () => (
    <React.Fragment>
        <Router>
            <AdminGate requireAdmin={true} component={Dashboard} path="/app/dashboard/" redirectTo="/app/login/"/>
            <AdminGate requireAdmin={true} component={Dashboard} path="/en/app/dashboard/" redirectTo="/en/app/login/"/>
            <AdminGate requireAdmin={false} component={Login} path="/app/login/" redirectTo="/app/dashboard/" />
            <AdminGate requireAdmin={false} component={Login} path="/en/app/login/" redirectTo="/en/app/dashboard/" />
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
