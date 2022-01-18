import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
// import {navigate} from "gatsby";
// import getFirebase from "../../utils/getFirebase";
// import {IdTokenResult} from "@firebase/auth-types";

function AdminRoute({component: Component, location, ...rest}: InferProps<typeof AdminRoute.propTypes>) {




    // if (!getFirebase().auth.curre && location?.pathname !== `/app/login`) {
    //     navigate("/app/login")
    //     return null
    // }
    return <Component {...rest} />
}

export default AdminRoute

AdminRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }
    ),
    path: PropTypes.string.isRequired
}