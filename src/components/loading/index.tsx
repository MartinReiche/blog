import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress";

export function Loading({ open }: InferProps<typeof Loading.propTypes>) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

Loading.propTypes = {
    open: PropTypes.bool.isRequired
}

export default Loading;