import * as React from "react";
import Link from "../link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {StaticImage} from "gatsby-plugin-image";
import Typography from "@mui/material/Typography";
import PropTypes, {InferProps} from 'prop-types';
import ShareButtons from "./shareButtons";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import IconButton from "@mui/material/IconButton";
import {graphql, useStaticQuery} from "gatsby";
import {useI18next} from "gatsby-plugin-react-i18next";

export default function ArticleInfo({date, title, description}: InferProps<typeof ArticleInfo.propTypes>) {
    const {site} = useStaticQuery(query);
    const {language} = useI18next();
    const {siteUrl} = site.siteMetadata;
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

            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                <Link to={"/about/"}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <Avatar sx={{width: 50, height: 50, marginRight: 1}} imgProps={{}}>
                            <StaticImage src={'../../images/portrait_sm.png'} alt={'Martin Reiche'}/>
                        </Avatar>
                        <Box>
                            <Typography>
                                Martin Reiche
                            </Typography>
                            {date && (
                                <Typography variant="caption" color="primary">
                                    {date}
                                </Typography>
                            )}
                        </Box>
                    </Box>

                </Link>
                <Box sx={{paddingLeft: 1}}>
                    <IconButton
                        color="primary"
                        href={`${siteUrl}${language === 'en' ? '/en' : ''}/blog/rss.xml`}
                        aria-label="RSS Feed">
                        <RssFeedIcon/>
                    </IconButton>
                </Box>
            </Box>

            <ShareButtons title={title} description={description}/>
        </Box>
    )
}

ArticleInfo.propTypes = {
    date: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}

const query = graphql`
  query ArticleInfo {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`