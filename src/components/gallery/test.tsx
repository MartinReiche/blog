import * as React from "react";
import Box from "@mui/material/Box";

export function TestComponent(props: any) {
    return (
        <Box sx={{ border: '1px solid red' }}>
            <div>TEST COMPONENT</div>
            <div>Props: {props.test}</div>
        </Box>
    )
}