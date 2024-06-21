import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const HangingWatch = ({ mainContent }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            updateClock();
        }, 1000);

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    const formatTime = (ms) => {
        let seconds = Math.floor(ms / 1000) % 60;
        let minutes = Math.floor(ms / (1000 * 60)) % 60;
        let hours = Math.floor(ms / (1000 * 60 * 60));

        return (
            (hours > 9 ? hours : "0" + hours) + ":" +
            (minutes > 9 ? minutes : "0" + minutes) + ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    };

    const updateClock = () => {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondDeg = ((seconds / 60) * 360) + 90;
        const minuteDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        const hourDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

        document.querySelector('.second').style.transform = `rotate(${secondDeg}deg)`;
        document.querySelector('.minute').style.transform = `rotate(${minuteDeg}deg)`;
        document.querySelector('.hour').style.transform = `rotate(${hourDeg}deg)`;
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#f0f0f0' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '10px', height: '100px', backgroundColor: '#333', mb: 1 }}></Box>
                <Box sx={{ width: '2px', height: `${200 + scrollPosition}px`, backgroundColor: '#333', mb: -6 }} id="strip"></Box>
                <Box sx={{
                    position: 'relative', width: '100px', height: '100px', backgroundColor: '#fff', border: '5px solid #333',
                    borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', mt: -6
                }}>
                    <Box sx={{ position: 'relative', width: '90px', height: '90px', borderRadius: '50%' }}>
                        <Box className="hand hour" sx={{ position: 'absolute', width: '2px', backgroundColor: '#333', transformOrigin: 'bottom', height: '20px', bottom: '50%', transform: 'rotate(90deg)' }}></Box>
                        <Box className="hand minute" sx={{ position: 'absolute', width: '2px', backgroundColor: '#333', transformOrigin: 'bottom', height: '30px', bottom: '50%', transform: 'rotate(180deg)' }}></Box>
                        <Box className="hand second" sx={{ position: 'absolute', width: '2px', backgroundColor: '#333', transformOrigin: 'bottom', height: '40px', bottom: '50%', transform: 'rotate(270deg)' }}></Box>
                        <Box sx={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                            <Typography id="display" variant="body2">{formatTime(elapsedTime)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ marginLeft: '20px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {mainContent}
            </Box>
        </Box>
    );
};

export default HangingWatch;
