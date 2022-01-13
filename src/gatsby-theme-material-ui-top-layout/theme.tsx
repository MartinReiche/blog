import { red, deepOrange, blueGrey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: deepOrange[900],
        },
        secondary: {
            main: blueGrey[50],
        },
        error: {
            main: red.A400,
        },
    },
});

export default responsiveFontSizes(theme);