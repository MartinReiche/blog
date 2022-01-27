import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import LoginButton from "./LoginButton";
import Stack  from "@mui/material/Stack";


export default function SignInPopUp() {
    const [open, setOpen] = React.useState(false);
    // const { onClose, selectedValue, open } = props;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>Login</Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle sx={{ fontWeight: 'bold'}}>
                        Sign in
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Test Test musu maso
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    <Stack spacing={2}>
                        <LoginButton variant="anonymous"/>
                        <LoginButton variant="google"/>
                        <LoginButton variant="twitter"/>
                        <LoginButton variant="github"/>
                        <LoginButton variant="facebook"/>
                    </Stack>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

