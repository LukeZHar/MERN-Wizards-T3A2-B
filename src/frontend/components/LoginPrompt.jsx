import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Function to display msg to user 
export default function LoginPrompt({ message = "You must be logged in to view this page." }) {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{
                bgcolor: "#fffff0",
                borderRadius: 2,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "100px",
            }}>
                <Typography variant="h5" color="error">
                    {message}
                </Typography>
                <Button 
                    variant="contained"
                    sx={{ 
                        marginTop: 2, 
                        bgcolor: "#00cccc", 
                        "&:hover": { bgcolor: "#009999" }
                    }}
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </Button>
            </Box>
        </Container>
    );
}
