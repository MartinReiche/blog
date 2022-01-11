import * as React from "react";
import Link from "../../components/link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {StaticImage} from "gatsby-plugin-image";
import Typography from "@mui/material/Typography";
import PropTypes, {InferProps} from 'prop-types';


export default function Info({ date}: InferProps<typeof Info.propTypes>) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: 5,
                paddingBottom: 2
            }}
        >
            <Link to={"/about"}>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Avatar sx={{width: 50, height: 50, marginRight: 1}}>
                        <StaticImage src={'../../images/portrait_sm.png'} alt={'Martin Reiche'}/>
                    </Avatar>

                    <Typography>
                        Martin Reiche
                    </Typography>

                </Box>
            </Link>
            {date && (
                <Typography color="primary">
                    {date}
                </Typography>
            )}
        </Box>
    )
}

Info.propTypes = {
    date: PropTypes.string
}
