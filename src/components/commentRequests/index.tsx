import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import NameAvatar from "../avatar";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link} from 'gatsby-theme-material-ui';

export default function CommentRequest(
    {name, path, linkTitle, message, createdAt}: InferProps<typeof CommentRequest.propTypes>
) {
    const handleRejectClick = () => {
        console.log("handle reject")
    }

    const handleAcceptClick = () => {
        console.log("handle accept")
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <NameAvatar name={name}/>
                }
                title={
                    <Box sx={{display: 'inline-block'}}>
                        {name}{' in '}
                        <Link underline="none" to={path}>{linkTitle}</Link>
                    </Box>

                }
                subheader={createdAt}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton color="success" aria-label="accept comment" onClick={handleAcceptClick}>
                    <CheckIcon/>
                </IconButton>
                <IconButton color="warning" aria-label="reject comment" onClick={handleRejectClick}>
                    <CancelIcon/>
                </IconButton>

            </CardActions>
        </Card>
    );
}

CommentRequest.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    linkTitle: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}