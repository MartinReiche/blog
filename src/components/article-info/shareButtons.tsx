import * as React from "react";
import PropTypes, {InferProps} from 'prop-types';
import Box from "@mui/material/Box";
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import Menu from "@mui/material/Menu";
import ShareIcon from "@mui/icons-material/Share"
import IconButton from "@mui/material/IconButton";
import {useLocation} from "@reach/router"
import {graphql, useStaticQuery} from "gatsby";
import {useI18next} from "gatsby-plugin-react-i18next";

export default function ShareButtons({title, description}: InferProps<typeof ShareButtons.propTypes>) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {pathname} = useLocation();
    const {site} = useStaticQuery(query);
    const {language} = useI18next();

    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {
        defaultTitle,
        defaultDescription,
        siteUrl,
    } = site.siteMetadata;

    const share = {
        title: title || defaultTitle,
        description: description || defaultDescription[language],
        url: `${siteUrl}${pathname}`,
    }

    return (
        <React.Fragment>
            <Box sx={{display: {xs: 'none', sm: "flex"}}}>
                <TwitterShareButton
                    url={share.url}
                    title={share.title}
                    style={{padding: '2px', display: 'flex', alignItems: 'center'}}
                >
                    <TwitterIcon size={35} round={true}/>
                </TwitterShareButton>
                <FacebookShareButton
                    url={share.url}
                    quote={share.title}
                    style={{padding: '2px', display: 'flex', alignItems: 'center'}}
                >
                    <FacebookIcon size={35} round={true}/>
                </FacebookShareButton>
                <TelegramShareButton
                    url={share.url}
                    title={share.title}
                    style={{padding: '2px', display: 'flex', alignItems: 'center'}}
                >
                    <TelegramIcon size={35} round={true}/>
                </TelegramShareButton>
                <WhatsappShareButton
                    url={share.url}
                    title={share.title}
                    style={{padding: '2px', display: 'flex', alignItems: 'center'}}
                >
                    <WhatsappIcon size={35} round={true}/>
                </WhatsappShareButton>
            </Box>
            <Box sx={{display: {xs: 'block', sm: "none"}}}>
                <IconButton
                    id="basic-button"
                    color="primary"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-label="Share on Social Media"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <ShareIcon/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'Share on Social Media',
                    }}
                    sx={{flexDirection: 'column'}}
                >
                    <TwitterShareButton
                        url={share.url}
                        title={share.title}
                        style={{padding: '6px', display: 'flex'}}
                        onClick={handleClose}
                    >
                        <TwitterIcon size={30} round={true}/>
                    </TwitterShareButton>
                    <FacebookShareButton
                        url={share.url}
                        quote={share.title}
                        style={{padding: '6px', display: 'flex'}}
                        onClick={handleClose}
                    >
                        <FacebookIcon size={30} round={true}/>
                    </FacebookShareButton>
                    <TelegramShareButton
                        url={share.url}
                        title={share.title}
                        style={{padding: '6px', display: 'flex'}}
                        onClick={handleClose}
                    >
                        <TelegramIcon size={30} round={true}/>
                    </TelegramShareButton>
                    <WhatsappShareButton
                        url={share.url}
                        title={share.title}
                        style={{padding: '6px', display: 'flex'}}
                        onClick={handleClose}
                    >
                        <WhatsappIcon size={30} round={true}/>
                    </WhatsappShareButton>
                </Menu>
            </Box>
        </React.Fragment>

    )
}

ShareButtons.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
}

const query = graphql`
  query ShareButtons {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description {
          de
          en
        }
        siteUrl
      }
    }
  }
`