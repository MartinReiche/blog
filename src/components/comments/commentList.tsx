import * as React from "react";
import PropTypes, {InferProps} from "prop-types";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import getFirebase from "../../utils/getFirebase";
import {collection, limit, onSnapshot, orderBy, query, where, Timestamp} from "firebase/firestore";
import CommentCard from './commentCard';
import Stack from "@mui/material/Stack";
import {useAuth} from "../auth-provider";

type Comment = {
    id: string,
    uid: string,
    name: string,
    message: string,
    pathname: string,
    createdAt: Timestamp
}

export default function CommentList({pathname}: InferProps<typeof CommentList.propTypes>) {
    const {user} = useAuth();
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

    const handleRejectClick = () => {
        console.log("reject")
    }

    const handleLoadMoreClick = () => {
        setQueryLimit(queryLimit + 10);
    }


    return (
        <React.Fragment>
            {loading && (
                <Box sx={{display: "flex", justifyContent: "center", padding: 4}}>
                    <CircularProgress color="primary"/>
                </Box>
            )}
            {!loading && !!comments.length && (
                <Stack spacing={2}>
                    {comments.map(comment => (
                        <CommentCard
                            key={comment.id}
                            commentData={comment}
                            handleRejectClick={user.isAdmin ? handleRejectClick : undefined}/>
                    ))}
                </Stack>
            )}
        </React.Fragment>

    )
}

CommentList.propTypes = {
    pathname: PropTypes.string.isRequired
};