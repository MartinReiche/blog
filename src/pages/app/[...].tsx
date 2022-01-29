import * as React from "react"
import {Router} from "@reach/router"
import Login from "../../components/login"
import AdminGate from "../../components/route-gates/admin-gate";
import Dashboard from "../../components/dashboard";
import {graphql} from "gatsby";

const App = () => (
    <React.Fragment>
        <Router basepath="/app">
            <AdminGate requireAdmin={true} component={Dashboard} path="/dashboard" redirectTo="/app/login"/>
            <AdminGate requireAdmin={false} component={Login} path="/login" redirectTo="/app/dashboard" />
        </Router>
        <Router basepath="/:lang/app">
            <AdminGate requireAdmin={true} component={Dashboard} path="/dashboard" redirectTo="/en/app/login"/>
            <AdminGate requireAdmin={false} component={Login} path="/login" redirectTo="/en/app/dashboard" />
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
