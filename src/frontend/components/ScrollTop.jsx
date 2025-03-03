import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollTop = (props) => {
    const { threshold = 100 } = props; // Default threshold for triggering the FAB
    const [showFab, setShowFab] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        setShowFab(scrollY > threshold);
    };

    // Attach and cleanup scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {showFab && (
                <Fab 
                    color="secondary" 
                    aria-label="scroll back to top" 
                    sx={{ position: 'fixed', bottom: 16, right: 16 }} 
                    onClick={scrollToTop}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            )}
        </div>
    );
};

export default ScrollTop;