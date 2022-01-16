import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Button from "@mui/material/Button";
import {useTranslation} from "gatsby-plugin-react-i18next";
import CommentList from "./commentList";


export default function Comments({articleId, collectionName}: InferProps<typeof Comments.propTypes>) {
    const {t} = useTranslation();
    const [open, setOpenState] = React.useState(false);

    const handleClickOpen = () => {
        setOpenState(true);
    }

    return (
        <React.Fragment>
            {open ? (
                <CommentList articleId={articleId} collectionName={collectionName}/>
            ) : (
                <Button onClick={handleClickOpen} sx={{marginBottom: 2}} size="small">
                    {t("i18n:comments")}
                </Button>
            )}


        </React.Fragment>

    )
};

Comments.propTypes = {
    articleId: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired
}