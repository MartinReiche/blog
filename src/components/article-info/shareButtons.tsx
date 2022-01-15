import * as React from "react";
import PropTypes, {InferProps} from 'prop-types';
import Box from "@mui/material/Box";
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
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


export default function ShareButtons({title, description}: InferProps<typeof ShareButtons.propTypes>) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {pathname} = useLocation();
    const {site} = useStaticQuery(query);

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
        description: description || defaultDescription,
        url: `${siteUrl}${pathname}`,
    }

    return (
        <React.Fragment>
            <Box sx={{display: {xs: 'none', sm: "block"}}}>
                <TwitterShareButton
                    url={share.url}
                    title={share.title}
                    style={{padding: '2px'}}
                >
                    <TwitterIcon size={30} round={true}/>
                </TwitterShareButton>
                <FacebookShareButton
                    url={share.url}
                    quote={share.title}
                    style={{padding: '2px'}}
                >
                    <FacebookIcon size={30} round={true}/>
                </FacebookShareButton>
                <TelegramShareButton
                    url={share.url}
                    title={share.title}
                    style={{padding: '2px'}}
                >
                    <TelegramIcon size={30} round={true}/>
                </TelegramShareButton>
                <WhatsappShareButton
                    url={share.url}
                    title={share.title}
                    style={{padding: '2px'}}
                >
                    <WhatsappIcon size={30} round={true}/>
                </WhatsappShareButton>
                <EmailShareButton
                    url={share.url}
                    subject={share.title}
                    body={share.description}
                    style={{padding: '2px'}}
                >
                    <EmailIcon size={30} round={true}/>
                </EmailShareButton>
            </Box>
            <Box sx={{display: {xs: 'block', sm: "none"}}}>
                <IconButton
                    color="primary"
                    id="basic-button"
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
                    <EmailShareButton
                        url={share.url}
                        subject={share.title}
                        body={share.description}
                        style={{padding: '6px', display: 'flex'}}
                        onClick={handleClose}
                    >
                        <EmailIcon size={30} round={true}/>
                    </EmailShareButton>
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
        defaultDescription: description
        siteUrl
      }
    }
  }
`