import React, { createContext, useState, useContext, useEffect } from 'react';
import { getWeatherByCity } from '../services/weatherService';
import { useTheme } from './ThemeContext';

// Create the Weather Context
const WeatherContext = createContext();

// Maximum number of cities to keep in search history
const MAX_HISTORY_SIZE = 5;

export const WeatherProvider = ({ children }) => {
  const { setWeatherTheme } = useTheme();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Load search history from localStorage on initial load
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('Error parsing search history:', err);
      }
    }
  }, []);
  
  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);
  
  /**
   * Fetches weather data for a specific city
   * @param {string} city - The city to fetch weather for
   */
  const fetchWeather = async (city) => {
    if (isOffline) {
      setError('You are currently offline. Please check your connection and try again.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      
      // Set theme based on weather condition
      if (data && data.weather && data.weather.length > 0) {
        setWeatherTheme(data.weather[0].main);
      }
      
      // Update search history
      updateSearchHistory(city, data);
      
    } catch (err) {
      setError(
        err.response?.status === 404
          ? `City "${city}" not found. Please check the spelling and try again.`
          : 'Failed to fetch weather data. Please try again later.'
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Updates the search history with the newly searched city
   * @param {string} city - The searched city
   * @param {Object} data - The weather data
   */
  const updateSearchHistory = (city, data) => {
    const timestamp = new Date().toISOString();
    const newEntry = {
      city,
      country: data.sys.country,
      temp: data.main.temp,
      weatherMain: data.weather[0].main,
      timestamp,
    };
    
    setSearchHistory(prevHistory => {
      // Remove city if it already exists in history
      const filteredHistory = prevHistory.filter(item => item.city.toLowerCase() !== city.toLowerCase());
      
      // Add new entry to the beginning
      const newHistory = [newEntry, ...filteredHistory];
      
      // Limit history size
      return newHistory.slice(0, MAX_HISTORY_SIZE);
    });
  };
  
  /**
   * Clears the weather data and error
   */
  const clearWeather = () => {
    setWeatherData(null);
    setError(null);
  };
  
  /**
   * Clears the search history
   */
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };
  
  /**
   * Retries the last search
   */
  const retryLastSearch = () => {
    if (searchHistory.length > 0) {
      fetchWeather(searchHistory[0].city);
    }
  };
  
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        isOffline,
        searchHistory,
        fetchWeather,
        clearWeather,
        clearHistory,
        retryLastSearch
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook for using the Weather Context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
