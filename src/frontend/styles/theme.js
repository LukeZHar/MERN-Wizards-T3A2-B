import { createTheme } from '@mui/material/styles';

// Create a theme instance with specific customizations
const theme = createTheme({
    palette: {
        primary: {
            main: '#00cccc',   // Main primary color for the application
            contrastText: '#ffffff', // Text color on primary buttons
        },
        secondary: {
            main: '#fffff0',   // Main secondary color
            contrastText: '#000000', // Text color on secondary buttons
        },
        background: {
            default: '#708090', // Default background color for the application
        },
        text: {
            primary: '#000000', // Primary text color
            secondary: '#fffff0', // Secondary text color
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h5: {
            fontWeight: 600, // Customize heading weight
        },
        body1: {
            fontSize: '1rem', // Base font size
            color: '#000000', // Base color for body text
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Rounded corners for buttons
                    fontWeight: 'bold', // Bold text for buttons
                    textTransform: 'none', // Prevent uppercase transformation on buttons
                },
                contained: {
                    backgroundColor: '#fffff0', // Background color for contained buttons
                    color: 'black', // Text color on contained buttons
                    "&:hover": {
                        backgroundColor: '#cccccc', // Hover background color
                    },
                },
                outlined: {
                    borderColor: '#00cccc', // Border color for outlined buttons
                    color: '#00cccc', // Text color on outlined buttons
                    "&:hover": {
                        borderColor: '#004d4d', // Darker border on hover
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px', // Bottom margin for all text fields
                    '& label.Mui-focused': {
                        color: '#fffff0', // Label color when focused
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#fffff0', // Default border color for text fields
                        },
                        '&:hover fieldset': {
                            borderColor: '#cccccc', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#cccccc', // Focused border color
                        },
                        backgroundColor: '#fffff0', // Input background color
                        color: 'black', // Input text color
                    },
                },
            },
        },
    },
});

export default theme;