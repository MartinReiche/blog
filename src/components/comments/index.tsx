import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Button from "@mui/material/Button";
import {useTranslation} from "gatsby-plugin-react-i18next";
import CommentList from "./commentList";
import NewComment from "./newComment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


export default function Comments({articleId, collectionName}: InferProps<typeof Comments.propTypes>) {
    const {t} = useTranslation();
    const [open, setOpenState] = React.useState(false);

    const handleClickOpen = () => {
        setOpenState(true);
    }

    const handleClickClose = () => {
        setOpenState(false);
    }

    if (open) {
        return (
            <Box id="comments-section">
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h4" component="h2" color="secondary.dark" sx={{fontWeight: 'fontWeightBold'}}>
                        {t("i18n:comments")}
                    </Typography>
                    <IconButton
                        color="primary"
                        size="small"
                        aria-label={t("i18n:close")}
                        aria-controls="comments-section"
                        sx={{marginLeft: 2}}
                        onClick={handleClickClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <NewComment/>
                <CommentList articleId={articleId} collectionName={collectionName}/>
            </Box>
        )
    } else {
        return (
            <Button
                onClick={handleClickOpen}
                sx={{marginBottom: 2}}
                size="small"
                aria-controls="comments-section"
            >
                {t("i18n:comments")}
            </Button>
        )
    }


};

Comments.propTypes = {
    articleId: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired
}