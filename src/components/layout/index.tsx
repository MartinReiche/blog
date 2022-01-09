import * as React from "react"
import PropTypes from "prop-types"
import Header from "./header";
import Footer from "./footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Layout: React.FC = ({children}) => {
    return (
        <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <Box sx={{flexGrow: 1}}>
                <Container maxWidth="md">
                    <main>{children}</main>
                </Container>
            </Box>
            <Footer />
        </Box>


    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
