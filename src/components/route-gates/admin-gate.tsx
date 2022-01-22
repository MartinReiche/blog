import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {navigate} from "gatsby";
import {useAuth} from "../auth-provider";
import Loading from "../loading";

function AdminGate({component: Component, location, redirectTo, requireAdmin, ...rest}: InferProps<typeof AdminGate.propTypes>) {
    const {user} = useAuth();

    if (user.isLoading) {
        return <Loading open={true}/>
    } else if (requireAdmin ? !user.isAdmin : user.isAdmin) {
        navigate(redirectTo);
        return null;
    }

    return <Component {...rest} />
}

export default AdminGate

AdminGate.propTypes = {
    component: PropTypes.elementType.isRequired,
    requireAdmin: PropTypes.bool.isRequired,
    location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }
    ),
    path: PropTypes.string.isRequired,
    redirectTo: PropTypes.string.isRequired
}