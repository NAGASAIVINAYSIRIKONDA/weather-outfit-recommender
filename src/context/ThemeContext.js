import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create the Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if the user has a saved theme preference
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    // Check if system prefers dark mode
    if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return savedTheme || 'light';
  };

  const [themeMode, setThemeMode] = useState(getSavedTheme);
  const [weatherCondition, setWeatherCondition] = useState(null);

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', themeMode);
    
    // Apply theme to document body to fix any potential glitches
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${themeMode}-mode`);
    
    // Apply transitions only after initial load
    setTimeout(() => {
      document.body.classList.add('theme-transition');
    }, 300);
  }, [themeMode]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Set the weather condition for theme adaptation
  const setWeatherTheme = (condition) => {
    setWeatherCondition(condition);
  };

  // Get weather-based colors
  const getWeatherColors = (condition) => {
    // Default colors
    const defaultColors = {
      primary: themeMode === 'light' ? '#1976d2' : '#90caf9',
      secondary: themeMode === 'light' ? '#f50057' : '#f48fb1',
      gradientStart: themeMode === 'light' ? 'rgba(25,118,210,0.1)' : 'rgba(25,118,210,0.05)',
      gradientEnd: themeMode === 'light' ? 'rgba(66,165,245,0.1)' : 'rgba(25,118,210,0.15)'
    };
    
    if (!condition) return defaultColors;
    
    const weatherType = condition.toLowerCase();
    
    // Weather-specific color schemes
    if (weatherType.includes('clear') || weatherType.includes('sun')) {
      return {
        primary: themeMode === 'light' ? '#ff9800' : '#ffc107', // Orange/yellow for sunny
        secondary: themeMode === 'light' ? '#ff5722' : '#ff9800',
        gradientStart: themeMode === 'light' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(255, 193, 7, 0.1)',
        gradientEnd: themeMode === 'light' ? 'rgba(255, 87, 34, 0.1)' : 'rgba(255, 152, 0, 0.15)'
      };
    } else if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      return {
        primary: themeMode === 'light' ? '#0277bd' : '#4fc3f7', // Blue for rain
        secondary: themeMode === 'light' ? '#01579b' : '#29b6f6',
        gradientStart: themeMode === 'light' ? 'rgba(2, 119, 189, 0.1)' : 'rgba(79, 195, 247, 0.1)',
        gradientEnd: themeMode === 'light' ? 'rgba(1, 87, 155, 0.1)' : 'rgba(41, 182, 246, 0.15)'
      };
    } else if (weatherType.includes('cloud')) {
      return {
        primary: themeMode === 'light' ? '#78909c' : '#90a4ae', // Gray-blue for cloudy
        secondary: themeMode === 'light' ? '#546e7a' : '#78909c',
        gradientStart: themeMode === 'light' ? 'rgba(120, 144, 156, 0.1)' : 'rgba(144, 164, 174, 0.1)',
        gradientEnd: themeMode === 'light' ? 'rgba(84, 110, 122, 0.1)' : 'rgba(120, 144, 156, 0.15)'
      };
    } else if (weatherType.includes('snow')) {
      return {
        primary: themeMode === 'light' ? '#4fc3f7' : '#81d4fa', // Light blue for snow
        secondary: themeMode === 'light' ? '#03a9f4' : '#4fc3f7',
        gradientStart: themeMode === 'light' ? 'rgba(79, 195, 247, 0.1)' : 'rgba(129, 212, 250, 0.1)',
        gradientEnd: themeMode === 'light' ? 'rgba(3, 169, 244, 0.1)' : 'rgba(79, 195, 247, 0.15)'
      };
    } else if (weatherType.includes('thunder')) {
      return {
        primary: themeMode === 'light' ? '#5e35b1' : '#9575cd', // Purple for thunderstorms
        secondary: themeMode === 'light' ? '#4527a0' : '#7e57c2',
        gradientStart: themeMode === 'light' ? 'rgba(94, 53, 177, 0.1)' : 'rgba(149, 117, 205, 0.1)',
        gradientEnd: themeMode === 'light' ? 'rgba(69, 39, 160, 0.1)' : 'rgba(126, 87, 194, 0.15)'
      };
    } else if (weatherType.includes('fog') || weatherType.includes('mist') || weatherType.includes('haze')) {
      return {
        primary: themeMode === 'light' ? '#90a4ae' : '#b0bec5', // Muted blue-gray for fog/mist
        secondary: themeMode === 'light' ? '#607d8b' : '#90a4ae',
        gradientStart: themeMode === 'light' ? 'rgba(144, 164, 174, 0.1)' : 'rgba(176, 190, 197, 0.1)',
        gradientEnd: themeMode === 'light' ? 'rgba(96, 125, 139, 0.1)' : 'rgba(144, 164, 174, 0.15)'
      };
    }
    
    return defaultColors;
  };
  
  // Get colors based on weather condition
  const weatherColors = getWeatherColors(weatherCondition);
  
  // Create the theme based on the current mode and weather
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: weatherColors.primary,
        },
        secondary: {
          main: weatherColors.secondary,
        },
        background: {
          default: themeMode === 'light' ? '#f5f5f5' : '#121212',
          paper: themeMode === 'light' ? '#ffffff' : '#1e1e1e',
        },
        weatherGradient: {
          start: weatherColors.gradientStart,
          end: weatherColors.gradientEnd
        }
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: 'background-color 0.5s ease, color 0.5s ease',
              scrollbarColor: themeMode === 'light' 
                ? '#bbbbbb #f5f5f5' 
                : '#555555 #2e2e2e',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: themeMode === 'light' ? '#f5f5f5' : '#2e2e2e',
              },
              '&::-webkit-scrollbar-thumb': {
                background: themeMode === 'light' ? '#bbbbbb' : '#555555',
                borderRadius: '4px',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: themeMode === 'light' 
                ? '0px 2px 8px rgba(0, 0, 0, 0.1)' 
                : '0px 2px 8px rgba(0, 0, 0, 0.4)',
              transition: 'box-shadow 0.3s, transform 0.3s, background-color 0.5s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: themeMode === 'light' 
                  ? '0px 4px 12px rgba(0, 0, 0, 0.15)' 
                  : '0px 4px 12px rgba(0, 0, 0, 0.5)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.5s ease, box-shadow 0.3s ease',
            }
          }
        }
      },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
      },
    },
    shape: {
      borderRadius: 8,
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
      },
    },
    shape: {
      borderRadius: 8,
    },
  }); 
  }, [themeMode, weatherCondition]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, setWeatherTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using the Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
