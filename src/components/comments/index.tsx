import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Button from "@mui/material/Button";
import {Trans} from "gatsby-plugin-react-i18next";

export default function Comments({commentId}: InferProps<typeof Comments.propTypes>) {

    const handleClick = () => {
        console.log(commentId)
    }

    return (
        <Button onClick={handleClick} sx={{marginBottom: 2}} size="small">
            <Trans>i18n:comments</Trans>
        </Button>
    )
};

Comments.propTypes = {
    commentId: PropTypes.string.isRequired
}