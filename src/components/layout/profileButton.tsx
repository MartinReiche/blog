import * as React from 'react';
import SignInPopUp from "../auth/signInPopUp";
import PropTypes, {InferProps} from "prop-types";

export default function ProfileButton({type}: InferProps<typeof ProfileButton.propTypes>) {

    return (
        <React.Fragment>
            <SignInPopUp type={type}/>
        </React.Fragment>
    );

}

ProfileButton.propTypes = {
    type: PropTypes.oneOf(['menu', 'button']).isRequired
}