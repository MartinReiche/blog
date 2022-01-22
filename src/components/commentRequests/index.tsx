import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import NameAvatar from "../avatar";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link} from 'gatsby-theme-material-ui';
import {ConfirmationDialog} from "../dialogs";
import getFirebase from "../../utils/getFirebase";
import {deleteDoc, doc, collection, addDoc, Timestamp} from 'firebase/firestore';
import {useI18next} from "gatsby-plugin-react-i18next";

export default function CommentRequest(
    { commentData }: InferProps<typeof CommentRequest.propTypes>
) {
    const {language} = useI18next();
    const { name, pathname, title, message, createdAt } = commentData;
    const handleRejectClick = async () => {
        const {db} = getFirebase();
        try {
            await addDoc(collection(db, 'rejectedComments'), {
                uid: commentData.uid,
                title: commentData.title,
                pathname: commentData.pathname,
                name: commentData.name,
                message: commentData.message,
                createdAt: commentData.createdAt
            });
            await deleteDoc(doc(db, 'commentRequests', commentData.id));
        } catch(e: any) {
            console.log(e)
        }
    }

    const handleAcceptClick = async () => {
        const {db} = getFirebase();
        try {
            await addDoc(collection(db, 'comments'), {
                uid: commentData.uid,
                pathname: commentData.pathname,
                name: commentData.name,
                message: commentData.message,
                createdAt: commentData.createdAt
            });
            await deleteDoc(doc(db, 'commentRequests', commentData.id));
        } catch(e: any) {
            console.log(e)
        }
    }


    return (
        <Card>
            <CardHeader
                avatar={
                    <NameAvatar name={name}/>
                }
                title={
                    <Box sx={{display: 'inline-block'}}>
                        {name}{' in '}
                        <Link underline="none" to={pathname}>{title}</Link>
                    </Box>
                }
                subheader={createdAt.toDate().toLocaleDateString(
                        language === 'de' ? 'de-DE' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric'}
                        )}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton color="success" aria-label="accept comment" onClick={handleAcceptClick}>
                    <CheckIcon/>
                </IconButton>
                <ConfirmationDialog onClickOk={handleRejectClick}>
                    <IconButton color="warning" aria-label="reject comment">
                        <CancelIcon/>
                    </IconButton>
                </ConfirmationDialog>
            </CardActions>
        </Card>
    );
}

CommentRequest.propTypes = {
    commentData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Timestamp).isRequired,
    }).isRequired,
}