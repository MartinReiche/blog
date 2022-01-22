import * as React from 'react';
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import Layout from "../layout";
import getFirebase from "../../utils/getFirebase";


import {collectionGroup, query, limit, orderBy, onSnapshot} from "firebase/firestore";
import CommentRequest from "../commentRequests";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {useI18next, useTranslation} from "gatsby-plugin-react-i18next";


type CommentRequest = {
    id: string,
    author: string,
    message: string,
    path: string,
    title: string,
    createdAt: string
}

export default function Dashboard() {
    const [commentRequests, setCommentRequests] = React.useState<CommentRequest[]>([]);
    const [loading, setLoading] = React.useState(true);
    const {language} = useI18next();
    const {t} = useTranslation();
    const dateStringOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    React.useEffect(() => {

        const {db} = getFirebase();
        const q = query(
            collectionGroup(db, 'commentRequests'),
            orderBy("createdAt", "desc"),
            limit(20),
        );

        const unsub = onSnapshot(q, (querySnapshot) => {
            const commentRequestChanges: CommentRequest[] = [];
            querySnapshot.forEach((doc) => {
                commentRequestChanges.push({
                    id: doc.id,
                    author: doc.data().author,
                    message: doc.data().message,
                    path: doc.data().path,
                    title: doc.data().title,
                    createdAt: doc.data()
                        .createdAt?.toDate()
                        .toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', dateStringOptions)
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
                        <CommentRequest
                            key={i}
                            name={commentRequest.author}
                            message={commentRequest.message}
                            createdAt={commentRequest.createdAt}
                            path={commentRequest.path}
                            linkTitle={commentRequest.title}
                        />
                    ))}
                </Stack>
            )}
        </Layout>
    )
}

Dashboard.propTypes = {
    path: PropTypes.string.isRequired
}
