import * as React from "react";
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

export default function ShareButtons() {
    return (
        <Box>
            <TwitterShareButton url={"test"} style={{padding: '2px'}}>
                <TwitterIcon size={30} round={true}/>
            </TwitterShareButton>
            <FacebookShareButton url={"test"} style={{padding: '2px'}}>
                <FacebookIcon size={30} round={true}/>
            </FacebookShareButton>
            <TelegramShareButton url={"test"} style={{padding: '2px'}}>
                <TelegramIcon size={30} round={true}/>
            </TelegramShareButton>
            <WhatsappShareButton url={"test"} style={{padding: '2px'}}>
                <WhatsappIcon size={30} round={true}/>
            </WhatsappShareButton>
            <EmailShareButton url={"test"} style={{padding: '2px'}}>
                <EmailIcon size={30} round={true}/>
            </EmailShareButton>
        </Box>
    )
}
