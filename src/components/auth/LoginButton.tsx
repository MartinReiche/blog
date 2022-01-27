import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import GithubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import AnonymousIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {getFirebase} from "../../utils";

export default function LoginButton({variant}: InferProps<typeof LoginButton.propTypes>) {

    const handleClickGoogle = () => {
        const auth = getAuth(getFirebase());
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result: any) => {
            const user = result.user;
            console.log(user)
        }).catch((error: Error) => {
            console.log(error)
        });

    }

    return (
        <Button variant="contained" sx={{px: 1}} onClick={handleClickGoogle}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Box sx={{display: 'flex', alignItems: 'center', pr: 3}}>
                    {variant === 'anonymous' && <AnonymousIcon/>}
                    {variant === 'google' && <GoogleIcon/>}
                    {variant === 'twitter' && <TwitterIcon/>}
                    {variant === 'github' && <GithubIcon/>}
                    {variant === 'facebook' && <FacebookIcon/>}
                </Box>
                <Box>
                    <Typography
                        sx={{lineHeight: 1, textTransform: 'none'}}
                    >
                        {variant === 'anonymous' && 'Sign in anonymously'}
                        {variant === 'google' && 'Sign in with Google'}
                        {variant === 'twitter' && 'Sign in with Twitter'}
                        {variant === 'github' && 'Sign in with Github'}
                        {variant === 'facebook' && 'Sign in with Facebook'}
                    </Typography>
                </Box>
            </Box>
        </Button>
    )
}

LoginButton.propTypes = {
    variant: PropTypes.oneOf(['anonymous', 'google', 'twitter', 'github', 'facebook']).isRequired
}