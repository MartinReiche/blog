import * as React from "react"
import {Router} from "@reach/router"
import Login from "../../components/login"
import AdminRoute from "../../components/route-gates/admin-route";
import NonAdminRoute from "../../components/route-gates/non-admin-route";
import NewComments from "../../components/profile";
import {graphql} from "gatsby";

const Path = () => (
    <React.Fragment>
        <Router>
            <AdminRoute component={NewComments} path="/app/profile/" redirectTo="/app/login"/>
            <AdminRoute component={NewComments} path="/:lang/app/profile/" redirectTo="/:lang/app/login"/>
            <NonAdminRoute component={Login} path="/app/login" redirectTo="/app/profile" />
            <NonAdminRoute component={Login} path="/:lang/app/login" redirectTo="/:lang/app/profile" />
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
