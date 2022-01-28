import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {useAuth} from "../authProvider";
import TwitterIcon from "@mui/icons-material/Twitter";
import SignInButtonBase from "./signInButtonBase";

export function TwitterSignInButton({handleClose}: InferProps<typeof TwitterSignInButton.propTypes>) {
    const {user, setUser} = useAuth();
    const signIn = async () => {
        const {getFirebase} = await import('../../../utils/getFirebase');
        const {getAuth, signInWithPopup} = await import('firebase/auth');
        const auth = getAuth(getFirebase());
        const {TwitterAuthProvider} = await import('firebase/auth');
        const provider = new TwitterAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user && !user.listening) setUser({...user, isAuthenticated: true});
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    return (
        <SignInButtonBase icon={TwitterIcon} text="Sign in with Twitter" onClick={signIn}/>
    )
}

TwitterSignInButton.propTypes = {handleClose: PropTypes.func.isRequired};