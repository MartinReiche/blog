import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {navigate} from "gatsby";
import {useAuth} from "../auth-provider";
import Loading from "../loading";

function AdminRoute({component: Component, location, redirectTo,...rest}: InferProps<typeof AdminRoute.propTypes>) {
    const user = useAuth();

    if (user.isLoading) {
        return <Loading open={true} />
    } else if (!user.isAdmin) {
        navigate(redirectTo);
        return null;
    }

    return <Component {...rest} />
}

export default AdminRoute

AdminRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }
    ),
    path: PropTypes.string.isRequired,
    redirectTo: PropTypes.string.isRequired
}