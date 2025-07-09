# Weather-Based Outfit Recommender

A React application that provides outfit recommendations based on real-time weather data. Simply search for a city, and the app will display current weather conditions along with personalized clothing suggestions to help you dress appropriately for the weather.


## Features

### Core Features
- **City Search**: Search for any city worldwide to get real-time weather data from OpenWeatherMap API.
- **Weather Display**: View current temperature, weather condition, wind speed, and humidity.
- **Outfit Recommendations**: Receive personalized clothing suggestions based on current weather conditions.
- **Search History**: Track and revisit your last 5 searched cities.

### Bonus Features
- **City Auto-suggest**: Get city suggestions as you type with debounced API calls.
- **Animations**: Enjoy smooth transitions and animations throughout the UI.
- **Theme Toggle**: Switch between light and dark modes for comfortable viewing.
- **Offline Detection**: Gracefully handle offline scenarios with retry functionality.

## Technologies Used

- **React**: Built with functional components and hooks
- **Material UI**: For component styling and responsive design
- **Axios**: For API requests
- **Framer Motion**: For animations
- **OpenWeatherMap API**: For real-time weather data

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/NAGASAIVINAYSIRIKONDA/weather-outfit-recommender.git

# Navigate to the project directory
cd weather-outfit-recommender

# Install dependencies
npm install

# Create a .env file in the root directory and add your OpenWeatherMap API key
echo "REACT_APP_OPENWEATHER_API_KEY=your_api_key_here" > .env

# Start the development server
npm start
```

> **Note**: You'll need to obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) to use the weather functionality.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Development Decisions & Assumptions

During the development of this application, several key decisions and assumptions were made:

1. **State Management**: Used React Context API instead of Redux for state management due to the moderate complexity of the application and to avoid additional dependencies.

2. **API Integration**: OpenWeatherMap API was chosen for its reliability and comprehensive data. The free tier provides adequate information for our use case.

3. **UI/UX Design**: Material UI was selected for its comprehensive component library, responsive design capabilities, and built-in accessibility features.

4. **Outfit Recommendations**: Recommendations are generated based on temperature ranges and weather conditions using a custom algorithm. This approach provides personalized suggestions without requiring a separate API.

5. **Offline Support**: The app detects connectivity issues and provides appropriate feedback, enhancing user experience during network disruptions.

6. **Local Storage**: Search history is persisted in the browser's localStorage to enhance user experience across sessions without requiring backend storage.

## Future Enhancements

Potential improvements for future versions:

- **Weather Forecast**: Add multi-day forecast capabilities
- **User Profiles**: Allow users to customize outfit preferences
- **Location Detection**: Add geolocation for automatic local weather
- **More Detailed Recommendations**: Include specific brands or shopping links
- **Social Sharing**: Enable users to share their weather and outfit combinations
