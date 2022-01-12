import * as React from "react";
import Link from "../link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {StaticImage} from "gatsby-plugin-image";
import Typography from "@mui/material/Typography";
import PropTypes, {InferProps} from 'prop-types';
import ShareButtons from "./shareButtons";


export default function ArticleInfo({date}: InferProps<typeof ArticleInfo.propTypes>) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: 3,
                paddingBottom: 2
            }}
        >
            <Link to={"/about"}>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Avatar sx={{width: 50, height: 50, marginRight: 1}}>
                        <StaticImage src={'../../images/portrait_sm.png'} alt={'Martin Reiche'}/>
                    </Avatar>
                    <Box>
                        <Typography>
                            Martin Reiche
                        </Typography>
                        {date && (
                            <Typography variant="caption" color="primary" sx={{display: {xs: 'none', sm: 'block'}}}>
                                {date}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Link>
            <ShareButtons/>
        </Box>
    )
}

ArticleInfo.propTypes = {
    date: PropTypes.string
}
