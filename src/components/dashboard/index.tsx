import * as React from 'react';
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import Layout from "../layout";
import getFirebase from "../../utils/getFirebase";

import {getFirestore, collection, query, limit, orderBy, onSnapshot, Timestamp} from "firebase/firestore";
import CommentRequest from "../commentRequests/commentRequest";
import RejectedComment from "../commentRequests/rejectedComment";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {useTranslation} from "gatsby-plugin-react-i18next";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

type CommentRequest = {
    id: string,
    uid: string,
    name: string,
    message: string,
    pathname: string,
    title: string,
    createdAt: Timestamp
}

const sections = [
    {title: "i18n:comments:pending", collection: "commentRequests"},
    {title: "i18n:comments:rejected", collection: "rejectedComments"},
];

export default function Dashboard() {
    const [commentRequests, setCommentRequests] = React.useState<CommentRequest[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [section, setSection] = React.useState(0);
    const {t} = useTranslation();
    const db = getFirestore(getFirebase());

    React.useEffect(() => {
        setLoading(true);
        const q = query(
            collection(db, sections[section].collection),
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
    }, [section])


    const handleSectionChange = (
        _event: React.MouseEvent<HTMLElement>,
        newSection: number
    ) => {
        setSection(newSection);
    };

    return (
        <Layout>
            <Typography
                variant="h2"
                component="h1"
                color="primary"
                sx={{mb: 2}}
            >
                {t("i18n:comments")}
            </Typography>
            <ToggleButtonGroup
                value={section}
                exclusive
                onChange={handleSectionChange}
                aria-label="sections"
            >
                {sections.map((section, index) => (
                    <ToggleButton key={index} value={index} aria-label={t(section.title)}>
                        {t(section.title)}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            {loading && (
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh'}}>
                    <CircularProgress color="primary"/>
                </Box>
            )}
            {!loading && sections[section].collection === 'commentRequests' && (
                <Box sx={{mt: 2, mb: 4}}>
                    {commentRequests.length > 0 ? (
                        <Stack spacing={2}>
                            {commentRequests.map((commentRequest, i) => (
                                <CommentRequest key={i} commentData={commentRequest}/>
                            ))}
                        </Stack>
                    ) : (
                        <Typography>{t("i18n:comments:pending-none")}</Typography>
                    )}
                </Box>
            )}
            {!loading && sections[section].collection === 'rejectedComments' && (
                <Box sx={{mt: 2, mb: 4}}>
                    {commentRequests.length > 0 ? (
                        <Stack spacing={2} sx={{mt: 2, mb: 4}}>
                            {commentRequests.map((commentRequest, i) => (
                                <RejectedComment key={i} commentData={commentRequest}/>
                            ))}
                        </Stack>
                    ) : (
                        <Typography>{t("i18n:comments:rejected-none")}</Typography>
                    )}
                </Box>
            )}
        </Layout>
    )
}

Dashboard.propTypes = {
    path: PropTypes.string.isRequired
}
