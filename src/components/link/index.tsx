import * as React from 'react';
import {Link as GatsbyThemeLink} from 'gatsby-theme-material-ui';
import {useI18next} from "gatsby-plugin-react-i18next";
import PropTypes, {InferProps} from "prop-types";


function Link(props: InferProps<typeof Link.propTypes>) {
    const {language, defaultLanguage} = useI18next();
    const {children, to} = props;

    let path = language === defaultLanguage ? to : `/${language}${to}`;
    // first remove all trailing slashes than add excatly one
    path.replace(/\/+$/, '') + "/";


    return (
        <GatsbyThemeLink underline="none" {...props as any} to={path}>
            {children}
        </GatsbyThemeLink>
    )
}


Link.propTypes = {
    children: PropTypes.node.isRequired,
    ...GatsbyThemeLink.propTypes,
    to: PropTypes.string.isRequired,
}

export default Link;