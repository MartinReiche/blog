import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';

import getFirebase from "../../utils/getFirebase";
import {deleteDoc, doc, collection, addDoc, Timestamp} from 'firebase/firestore';
import CommentCard from "./commentCard";

export default function RejectedComment({ commentData }: InferProps<typeof RejectedComment.propTypes>) {

    const handleDeleteClick = async () => {
        const {db} = getFirebase();
        try {
            await deleteDoc(doc(db, 'rejectedComments', commentData.id));
        } catch(e: any) {
            console.log(e)
        }
    }

    const handleRestoreClick = async () => {
        const {db} = getFirebase();
        try {
            await addDoc(collection(db, 'commentRequests'), {
                uid: commentData.uid,
                pathname: commentData.pathname,
                name: commentData.name,
                message: commentData.message,
                title: commentData.title,
                createdAt: commentData.createdAt
            });
            await deleteDoc(doc(db, 'rejectedComments', commentData.id));
        } catch(e: any) {
            console.log(e)
        }
    }

    return (
       <CommentCard
           commentData={commentData}
           handleRestoreClick={handleRestoreClick}
           handleDeleteClick={handleDeleteClick}
       />
    );
}

RejectedComment.propTypes = {
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