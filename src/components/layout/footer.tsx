import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import GitHub from '@mui/icons-material/GitHub';
import Twitter from '@mui/icons-material/Twitter';
import Button from '@mui/material/Button';
import {Link as GatsbyThemeLink} from "gatsby-theme-material-ui"

import {useTranslation} from "gatsby-plugin-react-i18next";
import Link from '../link';

import {graphql, useStaticQuery} from "gatsby";

const FooterItem: React.FC = ({children}) => (
    <Grid item sx={{p: 1}}>{children}</Grid>
)

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
                        sx={{p: 1}}
                    >
                        <FooterItem>
                            <Link to="/about/" sx={{color: 'inherit'}}>
                                <Button size="small" sx={{color: 'inherit', textTransform: 'none'}}>
                                    © {new Date().getFullYear()} {data.site.siteMetadata.author.name}
                                </Button>
                            </Link>
                        </FooterItem>
                        <FooterItem>
                            <Link to="/impressum/" sx={{color: 'inherit'}}>
                                <Button size="small" sx={{color: 'inherit', textTransform: 'none'}}>
                                    {t('i18n:impressum')}
                                </Button>
                            </Link>
                        </FooterItem>
                        <FooterItem>
                            <Link to="/privacy/" sx={{color: 'inherit'}}>
                                <Button size="small" sx={{color: 'inherit', textTransform: 'none'}}>
                                    {t('i18n:privacy')}
                                </Button>
                            </Link>
                        </FooterItem>
                        <Grid item>
                            <Grid container>
                                <FooterItem>
                                    <GatsbyThemeLink
                                        to="https://twitter.com/martin_reiche"
                                        target="_blank"
                                        rel="noopener"
                                        aria-label={t("i18n:my-twitter")}
                                        sx={{color: 'inherit'}}
                                    >
                                        <Twitter sx={{display: 'block'}}/>
                                    </GatsbyThemeLink>
                                </FooterItem>
                                <FooterItem>
                                    <GatsbyThemeLink
                                        to="https://github.com/MartinReiche/blog"
                                        target="_blank"
                                        rel="noopener"
                                        aria-label={t("i18n:my-github")}
                                        sx={{color: 'inherit'}}
                                    >
                                        <GitHub sx={{display: 'block'}}/>
                                    </GatsbyThemeLink>
                                </FooterItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Footer;