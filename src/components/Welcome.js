import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', my: 4 }}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(66,165,245,0.1) 100%)',
          borderRadius: 2,
        }}
      >
        <CloudQueueIcon 
          sx={{ 
            fontSize: 100, 
            mb: 2,
            color: 'primary.main' 
          }} 
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Weather Outfit Recommender
        </Typography>
        
        <Typography variant="body1" paragraph>
          Get personalized outfit recommendations based on current weather conditions. 
          Simply search for a city to get started!
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            This app provides real-time weather data and suggests appropriate clothing 
            to keep you comfortable throughout the day.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Welcome;
