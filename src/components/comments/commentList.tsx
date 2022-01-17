import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import getFirebase from "../../utils/getFirebase";
import {collection, doc, onSnapshot, query, where, limit, orderBy} from "firebase/firestore";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import {DocumentData} from "@firebase/firestore-types";
import {useTranslation} from "gatsby-plugin-react-i18next";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function CommentList({articleId, collectionName}: InferProps<typeof CommentList.propTypes>) {
    const [comments, setComments] = React.useState([] as DocumentData[]);
    const [queryLimit, setQueryLimit] = React.useState(10);
    const [userID, setCurrentUserID] = React.useState('');
    const {t} = useTranslation();

    React.useEffect(() => {
        const {db, auth} = getFirebase();
        const docRef = doc(db, collectionName, articleId);
        if (auth.currentUser) {
            setCurrentUserID(auth.currentUser.uid)
        }

        const q = query(
            collection(docRef, "comments"),
            where("visible", "==", true),
            limit(queryLimit),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (querySnapshot) => {
            const commentChanges: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                commentChanges.push({id: doc.id, ...doc.data()})
            });
            setComments(commentChanges);
        });

        return function cleanUp() {
            unsub();
        }
    }, [queryLimit])

    const handleLoadMoreClick = () => {
        setQueryLimit(queryLimit + 10);
    }

    return (
        <React.Fragment>
            <Typography variant="h4" component="h2" color="secondary.dark" sx={{fontWeight: 'fontWeightBold'}}>
                {t("i18n:comments")}
            </Typography>
            <List sx={{width: '100%'}}>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={comment.author}
                                secondary={
                                    <React.Fragment>
                                        {comment.message}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {comments.length - 1 !== index && (<Divider component="li"/>)}
                    </React.Fragment>

                ))}
            </List>
            {comments.length === queryLimit && (
                <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 3}}>
                    <Button size="small" color="primary" onClick={handleLoadMoreClick}>
                        {t("i18n:comments:load")}
                    </Button>
                </Box>
            )}
        </React.Fragment>
    )

}

CommentList.propTypes = {
    articleId: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired
};