import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useTranslation} from "gatsby-plugin-react-i18next";
import Link from '../link';
import {ChangeLocale} from "./ChangeLocale";
// @ts-ignore because this is handled by gatsby-plugin-react-svg
import Logo from "../../images/logo.svg";
import DashboardNavigation from "./dashboardNavigation";

const pages = [
    {label: 'i18n:blog', path: '/blog/'},
    // {label: 'i18n:podcast', path: '/podcast/'},
    {label: 'i18n:about', path: '/about/'},
    {label: 'i18n:support', path: '/support/'}
];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const {t} = useTranslation();

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{marginRight: 5, display: {xs: 'none', md: 'flex'}}}>
                        <Link to="/" aria-label="Home" style={{display: 'flex'}}>
                            <Logo style={{width: 50, height: 50}}/>
                        </Link>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label={t("i18n:menu")}
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={page.path} key={page.label}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        {t(page.label)}
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <Link to="/" aria-label="Home" style={{display: 'flex'}}>
                            <Logo style={{width: 42, height: 42}}/>
                        </Link>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Link to={page.path} key={page.label}>
                                <Button
                                    sx={{my: 2, color: 'secondary.light', display: 'block'}}
                                >
                                    {t(page.label)}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <DashboardNavigation/>
                    <ChangeLocale/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;