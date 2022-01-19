import * as React from 'react';
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import Layout from "../layout";

export default function Dashboard() {
    return (
        <Layout>
          <Typography variant="h2" component="h1" color="primary.dark" sx={{ fontWeight: 'bold', marginTop: 5}}>
              Dashboard
          </Typography>
        </Layout>
    )
}

Dashboard.propTypes = {
    path: PropTypes.string.isRequired
}
