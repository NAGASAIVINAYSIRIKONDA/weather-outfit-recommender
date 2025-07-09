import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Button,
  Slide,
  useTheme,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import { useWeather } from '../context/WeatherContext';

// Weather icon mapping
const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return '☀️';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'snow':
      return '❄️';
    case 'thunderstorm':
      return '⚡';
    case 'drizzle':
      return '🌦️';
    case 'mist':
    case 'fog':
      return '🌫️';
    default:
      return '🌡️';
  }
};

const SearchHistory = () => {
  const { searchHistory, clearHistory, fetchWeather } = useWeather();
  const theme = useTheme();
  
  if (!searchHistory || searchHistory.length === 0) {
    return null;
  }
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' +
           date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Card 
        elevation={3} 
        sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          mb: 4,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #2c3440 0%, #1a1a1a 100%)' 
            : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HistoryIcon sx={{ mr: 1 }} />
              <Typography variant="h5">
                Search History
              </Typography>
            </Box>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              startIcon={<DeleteIcon />}
              onClick={clearHistory}
            >
              Clear
            </Button>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List sx={{ width: '100%' }}>
            {searchHistory.map((item, index) => (
              <React.Fragment key={`${item.city}-${item.timestamp}`}>
                <ListItem
                  secondaryAction={
                    <Tooltip title="Search again">
                      <IconButton 
                        edge="end" 
                        aria-label="search" 
                        onClick={() => fetchWeather(item.city)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        background: 'transparent', 
                        fontSize: '1.5rem'
                      }}
                    >
                      {getWeatherIcon(item.weatherMain)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        {item.city}, {item.country}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {Math.round(item.temp)}°C • {item.weatherMain}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="text.secondary">
                          {formatTimestamp(item.timestamp)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < searchHistory.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default SearchHistory;
