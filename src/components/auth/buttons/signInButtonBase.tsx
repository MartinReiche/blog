import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export function SignInButtonBase({icon: Icon, text, onClick}: InferProps<typeof SignInButtonBase.propTypes>) {
    return (
        <Button variant="outlined" sx={{px: 1}} onClick={onClick}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Box sx={{display: 'flex', alignItems: 'center', pr: 3}}>
                    <Icon/>
                </Box>
                <Box>
                    <Typography sx={{lineHeight: 1, textTransform: 'none', fontWeight: 500}}>
                        {text}
                    </Typography>
                </Box>
            </Box>
        </Button>
    )
}

SignInButtonBase.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default SignInButtonBase;