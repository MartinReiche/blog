import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import {
    AnonymousSignInButton,
    FacebookSignInButton,
    GithubSignInButton,
    TwitterSignInButton,
    GoogleSignInButton
} from './buttons';
import PropTypes, {InferProps} from "prop-types";
import {useAuth} from "./authProvider";

export default function SignInPopUp({type}: InferProps<typeof SignInPopUp.propTypes>) {
    const [open, setOpen] = React.useState(false);
    const {user} = useAuth();

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignOutClick = async () => {
        const {getFirebase} = await import('../../utils/getFirebase');
        const {getAuth} = await import('firebase/auth');
        const auth = getAuth(getFirebase());
        if (auth.currentUser) {
            try {
                await auth.signOut();
            } catch (error) {
                console.error(error);
            }
        }
    }

    if (!user.isAuthenticated) {
        return (
            <React.Fragment>
                {type === 'button' && (<Button sx={{color: 'inherit'}} onClick={handleClickOpen}>Sign In</Button>)}
                {type === 'menu' && (<MenuItem onClick={handleClickOpen}>Sign In</MenuItem>)}
                <Dialog onClose={handleClose} open={open} color="primary">
                    <DialogTitle sx={{fontWeight: 'bold'}}>
                        Sign in
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Test Test musu maso
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <Stack spacing={2}>
                            <GoogleSignInButton handleClose={handleClose}/>
                            <TwitterSignInButton handleClose={handleClose}/>
                            <GithubSignInButton handleClose={handleClose}/>
                            <FacebookSignInButton handleClose={handleClose}/>
                            <AnonymousSignInButton handleClose={handleClose}/>
                        </Stack>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                {type === 'button' && (<Button sx={{color: 'inherit'}} onClick={handleSignOutClick}>Sign Out</Button>)}
                {type === 'menu' && (<MenuItem onClick={handleSignOutClick}>Sign Out</MenuItem>)}
            </React.Fragment>
        )
    }
}

SignInPopUp.propTypes = {
    type: PropTypes.oneOf(['menu', 'button']).isRequired
}
