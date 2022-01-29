import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {useAuth} from "../authProvider";
import GoogleIcon from "@mui/icons-material/Google";
import SignInButtonBase from "./signInButtonBase";

export function GoogleSignInButton({handleClose}: InferProps<typeof GoogleSignInButton.propTypes>) {
    const {user, setUser} = useAuth();
    const signIn = async () => {
        const {getFirebase} = await import('../../../utils/getFirebase');
        const {getAuth, signInWithPopup} = await import('firebase/auth');
        const auth = getAuth(getFirebase());
        const {GoogleAuthProvider} = await import('firebase/auth');
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user && !user.listening) setUser({...user, isAuthenticated: true});
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    return (
        <SignInButtonBase icon={GoogleIcon} text="Sign in with Google" onClick={signIn}/>
    )
}

GoogleSignInButton.propTypes = {handleClose: PropTypes.func.isRequired};