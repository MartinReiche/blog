import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {Link} from "gatsby-theme-material-ui";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {useTranslation} from "gatsby-plugin-react-i18next";

export default function BlogCard({blogData}: InferProps<typeof BlogCard.propTypes>) {
    const {t} = useTranslation();
    const {path, title, description, date, excerpt, title_image} = blogData;
    const image = title_image ? getImage(title_image.src) : null;

    return (
        <Card sx={{borderRadius: 0}}>
            <Link to={path} underline="none">
                <CardActionArea>
                    <CardHeader
                        title={
                            <Typography
                                variant="h2"
                                component="h1"
                                color="primary.dark"
                                sx={{fontWeight: '700', fontFamily: 'Playfair Display'}}
                            >
                                {title}
                            </Typography>
                        }
                        subheader={
                            <React.Fragment>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{mb: 2}}
                                >
                                    {description}
                                </Typography>
                                <Typography>
                                    Martin Reiche, {date}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </CardActionArea>
            </Link>
            {image && (
                <CardMedia>
                    <GatsbyImage image={image} alt={title}/>
                </CardMedia>
            )}
            <CardContent>
                <Typography
                    color="text.primary"
                >
                    {excerpt}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Link to={path} underline="none">
                    <Button color="secondary">
                        {t("i18n:blog:continue-reading")}
                    </Button>
                </Link>
            </CardActions>

        </Card>
    );
}

BlogCard.propTypes = {
    blogData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        excerpt: PropTypes.string.isRequired,
        title_image: PropTypes.any
    }).isRequired,
}
