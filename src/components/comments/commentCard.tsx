import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import NameAvatar from "../avatar";
import Box from "@mui/material/Box";
import {Link} from "gatsby-theme-material-ui";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/CheckCircle";
import {ConfirmationDialog} from "../dialogs";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import {Timestamp} from "firebase/firestore";
import {useI18next, useTranslation} from "gatsby-plugin-react-i18next";

export default function CommentCard(
    {
        commentData,
        handleAcceptClick,
        handleRejectClick,
        handleRestoreClick,
        handleDeleteClick,
    }: InferProps<typeof CommentCard.propTypes>) {
    const {language} = useI18next();
    const {t} = useTranslation();

    const {name, pathname, title, message, createdAt} = commentData;

    return (
        <Card >
            <CardHeader
                avatar={
                    <NameAvatar name={name}/>
                }
                title={
                    <Box sx={{display: 'inline-block'}}>
                        {name}
                        {title && (
                            <React.Fragment>
                                {' in '}<Link underline="none" to={pathname}>{title}</Link>
                            </React.Fragment>
                        )}
                    </Box>
                }
                subheader={createdAt.toDate().toLocaleDateString(
                    language === 'de' ? 'de-DE' : 'en-US',
                    {year: 'numeric', month: 'long', day: 'numeric'}
                )}
                action={
                    <Box sx={{display: {xs: 'block', sm: 'flex'}}}>
                        {handleAcceptClick && (
                            <IconButton
                                color="success"
                                aria-label="accept comment"
                                onClick={() => handleAcceptClick(commentData)}>
                                <CheckIcon/>
                            </IconButton>
                        )}
                        {handleRestoreClick && (
                            <IconButton
                                color="success"
                                aria-label="accept comment"
                                onClick={() => handleRestoreClick(commentData)}>
                                <RestoreIcon/>
                            </IconButton>
                        )}
                        {handleRejectClick && (
                            <ConfirmationDialog
                                onClickOk={() => handleRejectClick(commentData)}
                                title={t("i18n:comments:reject-title")}
                                description={t("i18n:comments:reject-description")}
                            >
                                <IconButton color="warning" aria-label="reject comment">
                                    <CancelIcon/>
                                </IconButton>
                            </ConfirmationDialog>
                        )}
                        {handleDeleteClick && (
                            <ConfirmationDialog
                                onClickOk={() => handleDeleteClick(commentData)}
                                title={t("i18n:comments:delete-title")}
                                description={t("i18n:comments:delete-description")}
                            >
                                <IconButton color="error" aria-label="reject comment">
                                    <DeleteIcon/>
                                </IconButton>
                            </ConfirmationDialog>
                        )}
                    </Box>
                }
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            </CardContent>
        </Card>
    );
}

CommentCard.propTypes = {
    commentData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        title: PropTypes.string,
        createdAt: PropTypes.instanceOf(Timestamp).isRequired,
    }).isRequired,
    handleAcceptClick: PropTypes.func,
    handleRejectClick: PropTypes.func,
    handleDeleteClick: PropTypes.func,
    handleRestoreClick: PropTypes.func,
}
