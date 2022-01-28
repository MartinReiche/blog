import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {useAuth} from "../authProvider";
import AnonymousIcon from "@mui/icons-material/Person";
import SignInButtonBase from "./signInButtonBase";

export function AnonymousSignInButton({handleClose}: InferProps<typeof AnonymousSignInButton.propTypes>) {
    const {user, setUser} = useAuth();
    const signIn = async () => {
        const {getFirebase} = await import('../../../utils/getFirebase');
        const {getAuth, signInAnonymously} = await import('firebase/auth');
        const auth = getAuth(getFirebase());
        try {
            const result = await signInAnonymously(auth)
            if (result.user && !user.listening) setUser({...user, isAuthenticated: true});
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    return (
        <SignInButtonBase icon={AnonymousIcon} text="Sign in anonymously" onClick={signIn}/>
    )
}

AnonymousSignInButton.propTypes = {handleClose: PropTypes.func.isRequired};