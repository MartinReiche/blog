import * as React from "react";
import PropTypes, {InferProps, string} from "prop-types";
import Link from "../link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {useTranslation} from "gatsby-plugin-react-i18next";

export default function PageNavigation({previous, next}: InferProps<typeof PageNavigation.propTypes>) {
    const {t} = useTranslation();
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
                {previous && (<Link to={previous.frontmatter.path}>
                    <Button size="small" sx={{ pl: 0 }} color="secondary">
                        <KeyboardArrowLeft />
                        <Box sx={{ display: {xs: 'none', sm: 'inline-block'}}}>
                            {previous.frontmatter.title}
                        </Box>
                        <Box sx={{ display: {xs: 'inline-block', sm: 'none'}}}>
                            {t("i18n:back")}
                        </Box>
                    </Button>
                </Link>)}
            </Box>
            <Box>
                {next && (<Link to={next.frontmatter.path}>
                    <Button size="small" sx={{ pr: 0}} color="secondary">
                        <Box sx={{ display: {xs: 'none', sm: 'inline-block', }}}>
                            {next.frontmatter.title}
                        </Box>
                        <Box sx={{ display: {xs: 'inline-block', sm: 'none'}}}>
                            {t("i18n:next")}
                        </Box>
                        <KeyboardArrowRight/>
                    </Button>
                </Link>)}
            </Box>
        </Box>
    )
}

const BlogNode = PropTypes.shape({
    frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: string.isRequired
    }).isRequired
});

PageNavigation.propTypes = {
    previous: BlogNode,
    next: BlogNode,
}