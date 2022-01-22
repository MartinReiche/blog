import * as React from 'react';
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import Layout from "../layout";
import getFirebase from "../../utils/getFirebase";

import {collection, query, limit, orderBy, onSnapshot, Timestamp} from "firebase/firestore";
import CommentRequest from "../commentRequests";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {useTranslation} from "gatsby-plugin-react-i18next";

type CommentRequest = {
    id: string,
    uid: string,
    name: string,
    message: string,
    pathname: string,
    title: string,
    createdAt: Timestamp
}

export default function Dashboard() {
    const [commentRequests, setCommentRequests] = React.useState<CommentRequest[]>([]);
    const [loading, setLoading] = React.useState(true);
    const {t} = useTranslation();

    React.useEffect(() => {

        const {db} = getFirebase();
        const q = query(
            collection(db, 'commentRequests'),
            orderBy("createdAt", "desc"),
            limit(20),
        );

        const unsub = onSnapshot(q, (querySnapshot) => {
            const commentRequestChanges: CommentRequest[] = [];
            querySnapshot.forEach((doc) => {
                commentRequestChanges.push({
                    ...doc.data() as CommentRequest,
                    id: doc.id
                })
            });
            setCommentRequests(commentRequestChanges);
            setLoading(false);
        });

        return function cleanUp() {
            unsub();
        }
    }, [])

    return (
        <Layout>
            <Typography variant="h2" component="h1" color="primary.dark" sx={{fontWeight: 'bold', marginTop: 5}}>
                {t("i18n:comments")}
            </Typography>
            {loading ? (
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh'}}>
                    <CircularProgress color="primary"/>
                </Box>
            ) : (
                <Stack spacing={2} sx={{marginTop: 4, marginBottom: 4}}>
                    {commentRequests.map((commentRequest, i) => (
                        <CommentRequest key={i} commentData={commentRequest} />
                    ))}
                </Stack>
            )}
        </Layout>
    )
}

Dashboard.propTypes = {
    path: PropTypes.string.isRequired
}
