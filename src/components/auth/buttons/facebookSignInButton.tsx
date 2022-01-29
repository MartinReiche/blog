import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {useAuth} from "../authProvider";
import FacebookIcon from "@mui/icons-material/Facebook";
import SignInButtonBase from "./signInButtonBase";

export function FacebookSignInButton({handleClose}: InferProps<typeof FacebookSignInButton.propTypes>) {
    const {user, setUser} = useAuth();
    const signIn = async () => {
        const {getFirebase} = await import('../../../utils/getFirebase');
        const {getAuth, signInWithPopup} = await import('firebase/auth');
        const auth = getAuth(getFirebase());
        const {FacebookAuthProvider} = await import('firebase/auth');
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user && !user.listening) setUser({...user, isAuthenticated: true});
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    return (
        <SignInButtonBase icon={FacebookIcon} text="Sign in with Facebook" onClick={signIn}/>
    )
}

FacebookSignInButton.propTypes = {handleClose: PropTypes.func.isRequired};