import * as React from "react";
import Link from "../link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes, {InferProps} from 'prop-types';
import ShareButtons from "./shareButtons";
import {graphql, useStaticQuery} from "gatsby";
import Stack from "@mui/material/Stack";

export default function ArticleInfo({date, title, description}: InferProps<typeof ArticleInfo.propTypes>) {
    const {site} = useStaticQuery(query);
    const {author} = site.siteMetadata;
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
                    <Stack>
                            <Typography color={"text.secondary"}>
                                {author.name}
                            </Typography>
                            {date && (
                                <Typography color="text.secondary">
                                    {date}
                                </Typography>
                            )}
                    </Stack>

                </Link>
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
        author {
            name
        }
      }
    }
  }
`