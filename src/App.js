import React, { useEffect, useState } from 'react';
import { Container, Box, useTheme as useMuiTheme } from '@mui/material';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import OutfitRecommendation from './components/OutfitRecommendation';
import SearchHistory from './components/SearchHistory';
import ErrorFallback from './components/ErrorFallback';
import Welcome from './components/Welcome';
import { useWeather } from './context/WeatherContext';
import './App.css';
import './styles/theme-transitions.css';

// Weather background component
const WeatherBackground = () => {
  const { weatherData } = useWeather();
  const [bgClass, setBgClass] = useState('');
  
  useEffect(() => {
    if (!weatherData) {
      setBgClass('');
      return;
    }
    
    const weatherType = weatherData.weather[0].main.toLowerCase();
    
    if (weatherType.includes('clear') || weatherType.includes('sun')) {
      setBgClass('weather-bg-clear');
    } else if (weatherType.includes('cloud')) {
      setBgClass('weather-bg-clouds');
    } else if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      setBgClass('weather-bg-rain');
    } else if (weatherType.includes('snow')) {
      setBgClass('weather-bg-snow');
    } else if (weatherType.includes('thunder')) {
      setBgClass('weather-bg-thunderstorm');
    } else if (weatherType.includes('mist') || weatherType.includes('fog') || weatherType.includes('haze')) {
      setBgClass('weather-bg-mist');
    } else {
      setBgClass('');
    }
  }, [weatherData]);
  
  return <div className={`weather-bg-animation ${bgClass}`} />;
};

// Main content component that uses the weather context
const MainContent = () => {
  const { weatherData, error } = useWeather();
  const muiTheme = useMuiTheme();
  
  return (
    <>
      <WeatherBackground />
      <SearchForm />
      <ErrorFallback />
      
      {!weatherData && !error && <Welcome />}
      
      {weatherData && (
        <>
          <WeatherDisplay />
          <OutfitRecommendation />
        </>
      )}
      
      <SearchHistory />
    </>
  );
};

// App component with providers
function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Container component="main" sx={{ flex: 1, pb: 4 }}>
            <MainContent />
          </Container>
        </Box>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
