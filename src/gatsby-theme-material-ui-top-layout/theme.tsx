import { red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#242b38',
        },
        secondary: {
            main: '#e84c1d'
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f5f5f5'
        },
    },
    typography: {
        fontFamily: "Montserrat",
        h1: {
            fontFamily: "Playfair Display",
            fontWeight: "700"
        },
        h2: {
            fontFamily: "Playfair Display",
            fontWeight: "700"
        },
        h3: {
            fontFamily: "Playfair Display",
            fontWeight: "700"
        }
    }
});

export default responsiveFontSizes(theme);