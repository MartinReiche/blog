import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Button from "@mui/material/Button";
import {useTranslation} from "gatsby-plugin-react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import NewComment from "./newComment";
import CommentList from "./commentList";
import {useLocation} from "@reach/router";


export default function Comments({title}: InferProps<typeof Comments.propTypes>) {
    const {t} = useTranslation();
    const {pathname} = useLocation();

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
                    <Typography variant="h4" component="h2"  sx={{fontWeight: 'fontWeightBold'}}>
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
                <NewComment pathname={pathname} title={title} />
                <CommentList pathname={pathname} title={title} />
            </Box>
        )
    } else {
        return (
            <Button
                onClick={handleClickOpen}
                aria-controls="comments-section"
                color="secondary"
            >
                {t("i18n:comments:comment")}
            </Button>
        )
    }


};

Comments.propTypes = {
    documentId: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}