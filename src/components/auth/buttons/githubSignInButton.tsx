import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {useAuth} from "../authProvider";
import GithubIcon from "@mui/icons-material/GitHub";
import SignInButtonBase from "./signInButtonBase";

export function GithubSignInButton({handleClose}: InferProps<typeof GithubSignInButton.propTypes>) {
    const {user, setUser} = useAuth();
    const signIn = async () => {
        const {getFirebase} = await import('../../../utils/getFirebase');
        const {getAuth, signInWithPopup} = await import('firebase/auth');
        const auth = getAuth(getFirebase());
        const {GithubAuthProvider} = await import('firebase/auth');
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user && !user.listening) setUser({...user, isAuthenticated: true});
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    return (
        <SignInButtonBase icon={GithubIcon} text="Sign in with Github" onClick={signIn}/>
    )
}

GithubSignInButton.propTypes = {handleClose: PropTypes.func.isRequired};