import React, { useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, 
  Chip,
  Divider,
  Zoom,
  useTheme as useMuiTheme
} from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { useWeather } from '../context/WeatherContext';

// Weather icon mapping
const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const WeatherDisplay = () => {
  const { weatherData, loading, error } = useWeather();
  const muiTheme = useMuiTheme();
  
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h5">Loading weather data...</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }
  
  if (!weatherData) {
    return null;
  }
  
  const { 
    name, 
    sys, 
    main, 
    weather, 
    wind, 
    visibility,
    dt 
  } = weatherData;
  
  // Format date from timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Convert temperature from Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };
  
  return (
    <Zoom in={true} style={{ transitionDelay: '200ms' }}>
      <Card 
        elevation={3}
        sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          mb: 4,
          background: theme => `linear-gradient(to bottom right, 
            ${theme.palette.weatherGradient?.start || 'rgba(255,255,255,0.7)'}, 
            ${theme.palette.weatherGradient?.end || 'rgba(255,255,255,0.3)'}
          )`,
          backdropFilter: 'blur(10px)',
          border: theme => `1px solid ${
            theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.12)' 
              : 'rgba(255,255,255,0.18)'
          }`,
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h4">
              {name}, {sys.country}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {formatDate(dt)}
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <img 
              src={getWeatherIcon(weather[0].icon)} 
              alt={weather[0].description} 
              style={{ width: 80, height: 80 }}
            />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {Math.round(main.temp)}°C
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {Math.round(celsiusToFahrenheit(main.temp))}°F
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              {weather[0].description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Chip 
                icon={<ThermostatIcon />} 
                label={`Feels like: ${Math.round(main.feels_like)}°C`} 
                variant="outlined" 
                sx={{ m: 0.5 }}
              />
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <OpacityIcon color="primary" />
                <Typography variant="body1">Humidity</Typography>
                <Typography variant="h6">{main.humidity}%</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <AirIcon color="primary" />
                <Typography variant="body1">Wind</Typography>
                <Typography variant="h6">{Math.round(wind.speed * 3.6)} km/h</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <CompressIcon color="primary" />
                <Typography variant="body1">Pressure</Typography>
                <Typography variant="h6">{main.pressure} hPa</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <VisibilityIcon color="primary" />
                <Typography variant="body1">Visibility</Typography>
                <Typography variant="h6">{(visibility / 1000).toFixed(1)} km</Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Min: {Math.round(main.temp_min)}°C | Max: {Math.round(main.temp_max)}°C
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default WeatherDisplay;
