import * as React from "react";
import PropTypes, {InferProps, string} from "prop-types";

import Link from "../../components/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export function BlogNavigation({previous, next}: InferProps<typeof BlogNavigation.propTypes>) {

    return (
        <Box sx={{ marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between'}}>
            <Box>
                {previous && (<Link to={previous.frontmatter.path}>
                    <Button
                        size="small"
                    >
                        <KeyboardArrowLeft/>
                        {previous.frontmatter.title}
                    </Button>
                </Link>)}
            </Box>
            <Box>
                {next && (<Link to={next.frontmatter.path}>
                    <Button size="small">
                        {next.frontmatter.title}
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

BlogNavigation.propTypes = {
    previous: BlogNode,
    next: BlogNode,
}