import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const NotFoundPage = () => {
    const navigate = useNavigate(); // Use the navigate hook from react-router-dom

    const handleGoHome = () => {
        navigate('/'); // Redirect to the Dash
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: { xs: "16px", sm: "24px" }
            }}
        >
            {/* Animated Heading */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        fontSize: { xs: "1.8rem", sm: "2.2rem" }
                    }}
                >
                    404 - Page Not Found
                </Typography>
            </motion.div>

            {/* Subtext */}
            <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, maxWidth: "90%" }}
            >
                Sorry, the page you are looking for does not exist.
            </Typography>

            {/* Animated Button */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                <Button
                    variant="contained"
                    onClick={handleGoHome}
                    sx={{
                        mt: 3,
                        px: 4,
                        py: 1.2,
                        fontSize: "1rem",
                        bgcolor: "#00cccc",
                        color: "#fffff0",
                        width: { xs: "100%", sm: "auto" }
                    }}
                >
                    Go to Home
                </Button>
            </motion.div>
        </Container>
    );
};

export default NotFoundPage;