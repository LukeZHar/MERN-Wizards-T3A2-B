import React from 'react';
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Login, HowToReg } from "@mui/icons-material"; // Icons for buttons
import brandLogo from "../assets/ProductIcon.png";

const Home = () => {
    const navigate = useNavigate(); // Use the navigate hook from react-router-dom

    const handleRegister = () => {
        navigate('/register'); // Redirect to the registration page
    };

    const handleLogin = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "background.default",
                padding: 4,
            }}
        >
            <Container component="main" maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Box
                        sx={{
                            bgcolor: "primary.main",
                            backdropFilter: "blur(12px)",
                            borderRadius: 3,
                            padding: 5,
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                        }}
                    >
                        {/* Floating Animated Logo */}
                        <motion.img
                            src={brandLogo}
                            alt="Brand Logo"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                display: "block",
                                margin: "20px auto",
                                width: "50%",
                                maxWidth: "230px",
                                borderRadius: "50%",
                            }}
                        />

                        {/* Heading */}
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                color: "text.secondary",
                                fontWeight: 700,
                                letterSpacing: "0.5px",
                                textTransform: "capitalize",
                            }}
                        >
                            Welcome to{" "}
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                    display: "inline-block",
                                }}
                            >
                                Friendly & Efficient Task Management
                            </motion.span>
                        </Typography>

                        {/* Tagline */}
                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                                opacity: 0.9,
                                fontSize: "1.1rem",
                                fontWeight: 400,
                                marginBottom: 2,
                            }}
                        >
                            Simplify your collaboration and workflow planning.
                        </Typography>

                        <Typography sx={{ fontWeight: "bold", color: "text.secondary", fontSize: "1rem", marginBottom: 3 }}>
                            Don't have an account?
                        </Typography>

                        {/* Buttons with hover effects */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleRegister}
                                    sx={{
                                        px: 3,
                                        py: 1.2,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <HowToReg sx={{ fontSize: "1.3rem" }} />
                                    Register
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleLogin}
                                    sx={{
                                        px: 3,
                                        py: 1.2,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Login sx={{ fontSize: "1.3rem" }} />
                                    Login
                                </Button>
                            </motion.div>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Home;
