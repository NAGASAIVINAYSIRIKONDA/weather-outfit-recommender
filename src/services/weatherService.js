import axios from 'axios';

// OpenWeatherMap API base URL and endpoints
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
// API key from environment variable
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

/**
 * Fetches weather data for a given city
 * @param {string} city - The name of the city
 * @returns {Promise} - Promise resolving to weather data
 */
export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use metric units by default
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Fetches city suggestions based on user input
 * @param {string} query - The user's search query
 * @returns {Promise} - Promise resolving to city suggestions
 */
export const getCitySuggestions = async (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  try {
    // Use OpenWeatherMap's Geocoding API for better suggestions
    const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5, // Limit to 5 suggestions
        appid: API_KEY
      }
    });
    
    if (response.data && Array.isArray(response.data)) {
      // Filter out duplicates (cities with same name in same country)
      const uniqueCities = [];
      const seen = new Set();
      
      return response.data
        .filter(city => {
          const key = `${city.name}-${city.country}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map(city => ({
          name: city.name,
          country: city.country,
          state: city.state,
          lat: city.lat,
          lon: city.lon
        }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    
    // Fallback to the find endpoint if geocoding fails
    try {
      const response = await axios.get(`${API_BASE_URL}/find`, {
        params: {
          q: query,
          appid: API_KEY,
          type: 'like',
          sort: 'population',
          cnt: 5 // Limit to 5 suggestions
        }
      });
      
      if (response.data && response.data.list) {
        // Extract city names from the response
        return response.data.list.map(city => ({
          name: city.name,
          country: city.sys.country
        }));
      }
      
      return [];
    } catch (fallbackError) {
      console.error('Fallback suggestion fetch failed:', fallbackError);
      return [];
    }
  }
};
