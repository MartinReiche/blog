import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {useI18next} from "gatsby-plugin-react-i18next";
import Link from '../link';

import {graphql, useStaticQuery} from "gatsby";

const Footer = () => {
    const {t} = useI18next();
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
        <AppBar position="static" color="secondary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container justifyContent="center" spacing={5}>
                        <Grid item>
                            <Typography color="primary.main" >
                                © {new Date().getFullYear()} {data.site.siteMetadata.author.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link to="/impressum">
                                {t('i18n:impressum')}
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Footer;