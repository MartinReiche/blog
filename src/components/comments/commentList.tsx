import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import {useTranslation} from "gatsby-plugin-react-i18next";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import getFirebase from "../../utils/getFirebase";
import {collection, limit, onSnapshot, orderBy, query, where, Timestamp} from "firebase/firestore";

type Comment = {
    id: string,
    name: string,
    message: string,
    createdAt: Timestamp
}

export default function CommentList({pathname}: InferProps<typeof CommentList.propTypes>) {
    const {t} = useTranslation();
    const [queryLimit, setQueryLimit] = React.useState(10);
    const [loading, setLoading] = React.useState(true);
    const [comments, setComments] = React.useState([] as Comment[]);

    React.useEffect(() => {
        const {db} = getFirebase();

        const q = query(
            collection(db, "comments"),
            where("pathname", '==', pathname),
            orderBy("createdAt", "desc"),
            limit(queryLimit)
        );

        const unsub = onSnapshot(q, (querySnapshot) => {
            const commentChanges: Comment[] = [];
            querySnapshot.forEach((doc) => {
                commentChanges.push({
                    ...doc.data() as Comment,
                    id: doc.id
                })
            });
            setComments(commentChanges);
            setLoading(false);
        });

        return function cleanUp() {
            unsub();
        }
    }, [queryLimit])

    const handleLoadMoreClick = () => {
        setQueryLimit(queryLimit + 10);
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 4}}>
                <CircularProgress color="primary"/>
            </Box>
        )
    }

    if (comments.length < 1) {
        return (
            <Typography sx={{paddingTop: 5, paddingBottom: 5}}>
                {t("i18n:comments:empty")}
            </Typography>
        )
    }

    return (
        <React.Fragment>
            <List sx={{width: '100%'}}>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={comment.name}
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
    pathname: PropTypes.string.isRequired
};