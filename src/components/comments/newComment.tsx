import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import {useFormik} from 'formik';
import * as yup from 'yup';
import getFirebase from "../../utils/getFirebase";
import {useAuth} from "../auth-provider";
import {useTranslation} from "gatsby-plugin-react-i18next";
import {doc, collection, addDoc, serverTimestamp} from "firebase/firestore";
import {getAuth, signInAnonymously, updateProfile, User} from "firebase/auth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object({
    name: yup
        .string()
        .required("i18n:comments:name-required"),
    message: yup
        .string()
        .required("i18n:comments:comment-required"),
});

export default function NewComment({collectionName, documentId}: InferProps<typeof NewComment.propTypes>) {
    const {t} = useTranslation();
    const [submitting, setSubmitting] = React.useState(false);
    const [showNotification, setShowNotification] = React.useState(false);
    const [notification, setNotification] = React.useState('');

    const {user, setUser} = useAuth();

    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
        },
        validationSchema: validationSchema,
        onSubmit: async ({name, message}, {setFieldValue}) => {
            const {db} = getFirebase();
            const docRef = doc(db, collectionName, documentId);
            const commentsRef = collection(docRef, 'comments');
            setSubmitting(true);
            try {
                if (!user.isAuthenticated) {
                    const auth = getAuth();
                    const authResult = await signInAnonymously(auth);
                    await updateProfile(authResult.user, {
                        displayName: name
                    });
                } else if (getAuth().currentUser && user.displayName !== name) {
                    await updateProfile(getAuth().currentUser as User, {
                        displayName: name
                    });
                }
                setUser({...user, displayName: name});

                await addDoc(commentsRef, {
                    author: name,
                    createdAt: serverTimestamp(),
                    userId: getAuth().currentUser?.uid,
                    message,
                })
                setSubmitting(false);
                setFieldValue('message', '', false);
                setNotification("i18n:comments:send-success");
                setShowNotification(true);
            } catch (e: any) {
                setSubmitting(false);
                setNotification("i18n:comments:send-error");
                setShowNotification(true);
            }
        },
    });

    React.useEffect(() => {
        if (user.displayName) {
            formik.setFieldValue('name', user.displayName);
        }
    }, [user.displayName])

    const handleCloseNotification = () => {
        setShowNotification(false);
    }


    return (
        <React.Fragment>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={submitting}
                onClick={e => e.stopPropagation()}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Snackbar
                open={showNotification}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                message={t(notification)}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseNotification}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
            />
            <Grid
                container
                direction="column"
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{marginTop: 2, marginBottom: 2}}
            >
                <Grid item>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label={t("i18n:comments:name")}
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && t(formik.errors.name as string) || ' '}
                    />
                </Grid>
                <Grid item sx={{marginTop: 1}}>
                    <TextField
                        fullWidth
                        id="message"
                        name="message"
                        label={t("i18n:comments:comment")}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && t(formik.errors.message as string) || ' '}
                        multiline
                        minRows={2}
                        maxRows={5}
                    />
                </Grid>
                <Grid item>
                    <Button color="primary" type="submit" disabled={submitting}>
                        {t("i18n:comments:send")}
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

NewComment.propTypes = {
    collectionName: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired
}