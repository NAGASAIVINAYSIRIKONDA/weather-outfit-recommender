import React, { useEffect } from 'react';
import { Box, Typography, Button, Paper, Container, Grow } from '@mui/material';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import ReplayIcon from '@mui/icons-material/Replay';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';

const ErrorFallback = () => {
  const { error, isOffline, retryLastSearch } = useWeather();
  
  // Move useEffect before the conditional return
  useEffect(() => {
    // Only run the animation if the component is visible (error or offline)
    if (error || isOffline) {
      const timer = setTimeout(() => {
        const element = document.getElementById('error-fallback');
        if (element) {
          element.classList.add('shake-animation');
          setTimeout(() => {
            if (element) {
              element.classList.remove('shake-animation');
            }
          }, 800);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [error, isOffline]);
  
  if (!error && !isOffline) {
    return null;
  }
  
  return (
    <Grow in={true}>
      <Container maxWidth="sm" sx={{ my: 4 }}>
        <Paper
          id="error-fallback"
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          elevation={3}
          sx={{
            p: 3,
            textAlign: 'center',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            border: theme => `1px solid ${
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.12)'
            }`
          }}
        >
          {/* Animated background */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage: isOffline
                ? 'repeating-linear-gradient(45deg, #ccc, #ccc 10px, #eee 10px, #eee 20px)'
                : 'repeating-linear-gradient(45deg, #fee, #fee 10px, #fdd 10px, #fdd 20px)',
              zIndex: 0
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {isOffline ? (
              <WifiOffIcon 
                sx={{ 
                  fontSize: 70, 
                  color: 'warning.main', 
                  mb: 2,
                  animation: 'pulse 2s infinite'
                }} 
              />
            ) : (
              <CloudOffIcon 
                sx={{ 
                  fontSize: 70, 
                  color: 'error.main', 
                  mb: 2 
                }} 
              />
            )}
            
            <Typography variant="h5" gutterBottom>
              {isOffline ? 'You are offline' : 'Something went wrong'}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              {isOffline 
                ? "Please check your internet connection and try again when you're back online."
                : error || 'We could not retrieve the weather data. Please try again later.'}
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color={isOffline ? "warning" : "primary"}
                startIcon={<ReplayIcon />}
                onClick={retryLastSearch}
                disabled={isOffline}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                {isOffline ? 'Check Connection' : 'Try Again'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Grow>
  );
};

export default ErrorFallback;
