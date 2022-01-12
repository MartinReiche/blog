import * as React from 'react';
import {Link as GatsbyThemeLink } from 'gatsby-theme-material-ui';
import {useI18next} from "gatsby-plugin-react-i18next";
import PropTypes from "prop-types";


const Link: React.FC<{ to: string }> = ({children, to}) => {
    const { language, defaultLanguage } = useI18next();
    let path = language === defaultLanguage ? to : `/${language}${to}`;

    // first remove all trailing slashes than add excatly one
    path = path.replace(/\/+$/, '') + "/";

    return (
        <GatsbyThemeLink to={path} style={{textDecoration: 'none'}}>
            {children}
        </GatsbyThemeLink>
    )
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
}

export default Link;