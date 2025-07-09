import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme as useMuiTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { themeMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  
  return (
    <AppBar 
      position="static" 
      sx={{
        background: muiTheme.palette.mode === 'dark' 
          ? 'linear-gradient(to right, #1a237e, #000000)' 
          : 'linear-gradient(to right, #1976d2, #42a5f5)',
        marginBottom: 4
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="h5" 
            component="div"
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              '& span': {
                fontSize: '1.8rem',
                marginRight: '8px'
              }
            }}
          >
            <span role="img" aria-label="weather and outfit">🌤️👕</span> 
            Weather Outfit Recommender
          </Typography>
          
          <IconButton 
            onClick={toggleTheme} 
            color="inherit" 
            aria-label="toggle theme"
            sx={{ ml: 2 }}
          >
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
