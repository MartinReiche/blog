import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Button from "@mui/material/Button";
import {useTranslation} from "gatsby-plugin-react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {collection, doc, onSnapshot, query, where, limit, orderBy} from "firebase/firestore";

import getFirebase from "../../utils/getFirebase";
import NewComment from "./newComment";
import CommentList from "./commentList";

type Comment = {
    id: string,
    author: string,
    message: string,
    createdAt: Date
}

export default function Comments({documentId, collectionName}: InferProps<typeof Comments.propTypes>) {
    const {t} = useTranslation();
    const [open, setOpenState] = React.useState(false);
    const [comments, setComments] = React.useState([] as Comment[]);
    const [queryLimit, setQueryLimit] = React.useState(10);

    React.useEffect(() => {
        const {db} = getFirebase();
        const docRef = doc(db, collectionName, documentId);

        const q = query(
            collection(docRef, "comments"),
            where("visible", "==", true),
            limit(queryLimit),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (querySnapshot) => {
            const commentChanges: Comment[] = [];
            querySnapshot.forEach((doc) => {
                commentChanges.push({
                    id: doc.id,
                    author: doc.data().author,
                    message: doc.data().message,
                    createdAt: doc.data().createdAt.toDate()
                })
            });
            setComments(commentChanges);
        });

        return function cleanUp() {
            unsub();
        }
    }, [queryLimit])

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
                <CommentList comments={comments}/>
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
    documentId: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired
}