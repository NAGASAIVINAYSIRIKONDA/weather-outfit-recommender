import React, { useState, useEffect, useRef } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  InputAdornment,
  Typography,
  Grow
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useWeather } from '../context/WeatherContext';
import { getCitySuggestions } from '../services/weatherService';

const SearchForm = () => {
  const { fetchWeather, loading, isOffline } = useWeather();
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const suggestionRef = useRef(null);
  
  // Handle click outside suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
      setShowSuggestions(false);
    }
  };
  
  // Fetch city suggestions as the user types
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);
    setIsTyping(true);
    
    if (value.trim().length > 2 && !isOffline) {
      // Delay suggestion fetching to reduce API calls while typing (debounce)
      const timer = setTimeout(async () => {
        try {
          const citySuggestions = await getCitySuggestions(value);
          
          if (citySuggestions && citySuggestions.length > 0) {
            setSuggestions(citySuggestions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsTyping(false);
        }
      }, 400); // Slightly longer debounce for better UX
      
      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
      setIsTyping(false);
    }
  };
  
  // Select a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setCity(`${suggestion.name}, ${suggestion.country}`);
    setShowSuggestions(false);
    fetchWeather(`${suggestion.name}, ${suggestion.country}`);
  };
  
  return (
    <Grow in={true} timeout={800}>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', width: '100%' }}>
          <TextField
            fullWidth
            label="Enter city name"
            variant="outlined"
            value={city}
            onChange={handleInputChange}
            disabled={loading || isOffline}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button 
            type="submit"
            variant="contained" 
            color="primary" 
            disabled={!city.trim() || loading || isOffline}
            startIcon={<SearchIcon />}
            sx={{ ml: 1, height: '56px' }}
          >
            Search
          </Button>
        </Box>
        
        {/* City suggestions dropdown with improved styling */}
        {showSuggestions && (
          <Paper 
            ref={suggestionRef}
            elevation={4} 
            sx={{ 
              position: 'absolute', 
              top: '56px', 
              left: 0, 
              right: '64px', 
              zIndex: 10,
              maxHeight: '300px',
              overflowY: 'auto',
              borderRadius: '8px',
              border: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
              boxShadow: theme => theme.palette.mode === 'dark' 
                ? '0 8px 16px rgba(0,0,0,0.5)' 
                : '0 8px 16px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <List sx={{ p: 0 }}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <ListItem 
                    key={index} 
                    button 
                    onClick={() => handleSelectSuggestion(suggestion)}
                    divider={index < suggestions.length - 1}
                    sx={{ 
                      py: 1.5,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: theme => theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(25, 118, 210, 0.08)',
                        transform: 'translateX(5px)'
                      } 
                    }}
                  >
                    <ListItemText 
                      primary={
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOnIcon 
                            color="primary" 
                            fontSize="small" 
                            sx={{ mr: 1.5 }} 
                          />
                          <strong>{suggestion.name}</strong>
                          <Typography 
                            component="span" 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ ml: 0.5 }}
                          >
                            , {suggestion.country}
                          </Typography>
                        </Typography>
                      } 
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem sx={{ py: 2 }}>
                  <ListItemText 
                    primary={
                      <Typography align="center" color="text.secondary">
                        No cities found. Try a different search.
                      </Typography>
                    } 
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        )}
        
        {isTyping && !showSuggestions && city.trim().length > 2 && (
          <Paper 
            elevation={3}
            sx={{ 
              position: 'absolute', 
              top: '56px', 
              left: 0, 
              right: '64px', 
              zIndex: 10,
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography color="text.secondary">
              Searching for "{city}"...
            </Typography>
          </Paper>
        )}
        
        {isOffline && (
          <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
            You're currently offline. Search is disabled.
          </Typography>
        )}
      </Box>
    </Grow>
  );
};

export default SearchForm;
