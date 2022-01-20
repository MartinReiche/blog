import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import {useTranslation} from "gatsby-plugin-react-i18next";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CommentList({comments}: InferProps<typeof CommentList.propTypes>) {
    const [queryLimit, setQueryLimit] = React.useState(10);
    const {t} = useTranslation();



    const handleLoadMoreClick = () => {
        setQueryLimit(queryLimit + 10);
    }

    if (comments.length < 1) return (
        <Typography>
            {t("i18n:comments:empty")}
        </Typography>
    )


    return (
        <React.Fragment>

            <List sx={{width: '100%'}}>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={comment.author}
                                secondary={
                                    <React.Fragment>
                                        {comment.message}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {comments.length - 1 !== index && (<Divider component="li"/>)}
                    </React.Fragment>

                ))}
            </List>
            {comments.length === queryLimit && (
                <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 3}}>
                    <Button size="small" color="primary" onClick={handleLoadMoreClick}>
                        {t("i18n:comments:load")}
                    </Button>
                </Box>
            )}
        </React.Fragment>
    )

}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.string.isRequired,
           author: PropTypes.string.isRequired,
           message: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};