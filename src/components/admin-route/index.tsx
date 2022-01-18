import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress";
import {navigate} from "gatsby";
import {useAuth} from "../auth-provider";

function Loading() {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

function AdminRoute({component: Component, location, ...rest}: InferProps<typeof AdminRoute.propTypes>) {
    const user = useAuth();

    console.log(rest)

    if (user.isLoading) {
        return <Loading />
    } else if (!user.isAdmin) {
        navigate("/app/login")
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
    path: PropTypes.string.isRequired
}