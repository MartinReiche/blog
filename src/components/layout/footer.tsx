import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {GitHub, Twitter} from "@mui/icons-material";
import { Link as GatsbyThemeLink } from "gatsby-theme-material-ui"

import {useTranslation} from "gatsby-plugin-react-i18next";
import Link from '../link';

import {graphql, useStaticQuery} from "gatsby";

const Footer = () => {
    const {t} = useTranslation();
    const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                    >

                        <Grid item sx={{p: 2}}>
                            <GatsbyThemeLink
                                to="https://twitter.com/martin_reiche"
                                target="_blank"
                                sx={{color: 'inherit'}}
                            >
                                <Twitter sx={{ display: 'block'}}/>
                            </GatsbyThemeLink>
                        </Grid>
                        <Grid item sx={{p: 2}}>
                            <GatsbyThemeLink
                                to="https://github.com/MartinReiche/blog"
                                target="_blank"
                                sx={{color: 'inherit'}}
                            >
                                <GitHub sx={{ display: 'block'}}/>
                            </GatsbyThemeLink>
                        </Grid>
                        <Grid item sx={{p: 2}}>
                            <Typography variant="body2">
                                © {new Date().getFullYear()} {data.site.siteMetadata.author.name}
                            </Typography>
                        </Grid>
                        <Grid item sx={{p: 2}}>
                            <Link to="/impressum/" sx={{color: 'inherit'}}>
                                <Typography variant="body2">
                                    {t('i18n:impressum')}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Footer;