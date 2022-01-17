import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Login() {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Box>
                <Typography variant={"h2"} color={"primary"}>Login Page</Typography>
            </Box>
        </Box>
    )
}
