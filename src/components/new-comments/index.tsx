import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";

export default function NewComments() {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Box>
                <Typography variant={"h2"} color={"primary"}>New Comments</Typography>
            </Box>
        </Box>
    )
}

NewComments.propTypes = {
    path: PropTypes.string.isRequired
}
