import * as React from "react";
import PropTypes, {InferProps} from "prop-types";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import getFirebase from "../../utils/getFirebase";
import {
    getFirestore,
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
    Timestamp,
    addDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import CommentCard from './commentCard';
import Stack from "@mui/material/Stack";
import {useAuth} from "../auth/authProvider";
import {useInView} from 'react-intersection-observer';

const LOAD_INITIAL_COMMETS = 5;
const RELOAD_COMMENTS = 5;

type Comment = {
    id: string,
    uid: string,
    name: string,
    message: string,
    pathname: string,
    createdAt: Timestamp
}

export default function CommentList({pathname, title}: InferProps<typeof CommentList.propTypes>) {
    const {user} = useAuth();
    const [queryLimit, setQueryLimit] = React.useState(LOAD_INITIAL_COMMETS);
    const [loading, setLoading] = React.useState(true);
    const [comments, setComments] = React.useState([] as Comment[]);
    const {ref, inView} = useInView({
        /* Optional options */
        threshold: 0,
        delay: 500
    });
    const db = getFirestore(getFirebase());

    React.useEffect(() => {
        if (inView && comments.length === queryLimit) {
            setQueryLimit(queryLimit + RELOAD_COMMENTS);
        }
    }, [inView])

    React.useEffect(() => {
        setLoading(true);
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

    const handleRejectClick = async (commentData: Comment) => {
        try {
            await addDoc(collection(db, 'rejectedComments'), {
                uid: commentData.uid,
                title: title,
                pathname: commentData.pathname,
                name: commentData.name,
                message: commentData.message,
                createdAt: commentData.createdAt
            });
            await deleteDoc(doc(db, 'comments', commentData.id));
        } catch (e: any) {
            console.log(e)
        }
    }


    return (
        <React.Fragment>
            {!!comments.length && (
                <Stack spacing={1}>
                    {comments.map((comment, i) => (
                        <CommentCard
                            observerRef={comments.length-1 === i ? ref : undefined}
                            key={comment.id}
                            commentData={comment}
                            handleRejectClick={user.isAdmin ? handleRejectClick : undefined}
                        />
                    ))}
                </Stack>
            )}
            {loading && (
                <Box sx={{display: "flex", justifyContent: "center", padding: 4}}>
                    <CircularProgress color="primary"/>
                </Box>
            )}
        </React.Fragment>

    )
}

CommentList.propTypes = {
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};