import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';

import getFirebase from "../../utils/getFirebase";
import {deleteDoc, doc, collection, addDoc, Timestamp} from 'firebase/firestore';
import CommentCard from "../comments/commentCard";

export default function CommentRequest({ commentData }: InferProps<typeof CommentRequest.propTypes>) {

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
       <CommentCard
           commentData={commentData}
           handleAcceptClick={handleAcceptClick}
           handleRejectClick={handleRejectClick}
       />
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