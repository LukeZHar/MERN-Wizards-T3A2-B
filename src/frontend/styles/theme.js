import { createTheme } from '@mui/material/styles';

// Create a theme instance with your specific customizations
const theme = createTheme({
    palette: {
        primary: {
            main: '#00cccc', // Primary color
            contrastText: '#ffffff', // Text color on primary buttons
        },
        secondary: {
            main: '#fffff0', // Secondary color
            contrastText: '#000000', // Text color on secondary buttons
        },
        text: {
            primary: '#000000', // Default text color - black
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h5: {
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            color: '#000000', // Set body text color
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Rounded corners
                    fontWeight: 'bold', // Bold text on buttons
                    backgroundColor: '#fffff0', // Background color for buttons
                    color: 'black', // Default text color for buttons
                    "&:hover": {
                        backgroundColor: '#cccccc', // Hover state color
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px',
                    '& label.Mui-focused': {
                        color: '#fffff0', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#fffff0', // Initial border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#333333', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#cccccc', // Focused border color
                        },
                        // Set input text color and background color
                        backgroundColor: '#fffff0', // Input background color
                        color: 'black', // Input text color
                    },
                },
            },
        },
    },
});

export default theme;