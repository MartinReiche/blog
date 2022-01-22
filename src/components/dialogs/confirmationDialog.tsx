import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import {useTranslation} from 'gatsby-plugin-react-i18next';

export function ConfirmationDialog({ children, onClickOk, title, description }: InferProps<typeof ConfirmationDialog.propTypes>) {
    const [open, setOpen] = React.useState(false);
    const {t} = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCallback = () => {
        setOpen(false);
        onClickOk();
    };

    return (
        <React.Fragment>
            <Box onClick={handleClickOpen}>
                {children}
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("i18n:cancel")}</Button>
                    <Button onClick={handleCallback} autoFocus>
                        {t("i18n:ok")}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

ConfirmationDialog.propTypes = {
    children: PropTypes.element.isRequired,
    onClickOk: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}