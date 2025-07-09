/**
 * Generates outfit recommendations based on current weather conditions
 * @param {Object} weatherData - Weather data from OpenWeatherMap API
 * @returns {Object} - Outfit recommendations for the current weather
 */
export const getOutfitRecommendation = (weatherData) => {
  if (!weatherData) {
    return null;
  }

  const { main, weather, wind } = weatherData;
  const temperature = main.temp;
  const weatherCondition = weather[0].main.toLowerCase();
  const windSpeed = wind.speed;
  
  // Default recommendations
  const recommendation = {
    tops: [],
    bottoms: [],
    accessories: [],
    advice: '',
    icon: ''
  };
  
  // Temperature-based recommendations
  if (temperature < 0) {
    recommendation.tops.push('Heavy winter coat', 'Thermal shirt', 'Sweater');
    recommendation.bottoms.push('Insulated pants', 'Thermal leggings');
    recommendation.accessories.push('Winter hat', 'Gloves', 'Scarf', 'Winter boots');
    recommendation.advice = 'Bundle up! It\'s freezing outside.';
    recommendation.icon = 'ac_unit'; // MUI icon name
  } else if (temperature < 10) {
    recommendation.tops.push('Winter coat', 'Sweater', 'Long-sleeve shirt');
    recommendation.bottoms.push('Jeans', 'Warm pants');
    recommendation.accessories.push('Light gloves', 'Beanie', 'Ankle boots');
    recommendation.advice = 'It\'s quite cold. Layer up!';
    recommendation.icon = 'ac_unit';
  } else if (temperature < 20) {
    recommendation.tops.push('Light jacket', 'Hoodie', 'Long-sleeve shirt');
    recommendation.bottoms.push('Jeans', 'Casual pants');
    recommendation.accessories.push('Light scarf');
    recommendation.advice = 'It\'s cool outside. A light jacket should be enough.';
    recommendation.icon = 'device_thermostat';
  } else if (temperature < 25) {
    recommendation.tops.push('T-shirt', 'Light sweater');
    recommendation.bottoms.push('Jeans', 'Casual pants', 'Skirt with leggings');
    recommendation.accessories.push('Light jacket for evening');
    recommendation.advice = 'Pleasant temperature. Dress comfortably.';
    recommendation.icon = 'wb_sunny';
  } else if (temperature < 30) {
    recommendation.tops.push('T-shirt', 'Short-sleeve shirt');
    recommendation.bottoms.push('Shorts', 'Skirt', 'Light pants');
    recommendation.accessories.push('Sunglasses', 'Hat');
    recommendation.advice = 'It\'s warm. Dress lightly.';
    recommendation.icon = 'wb_sunny';
  } else {
    recommendation.tops.push('Light T-shirt', 'Tank top');
    recommendation.bottoms.push('Shorts', 'Light skirt');
    recommendation.accessories.push('Sunglasses', 'Sun hat', 'Sunscreen');
    recommendation.advice = 'It\'s hot! Wear light, breathable clothing.';
    recommendation.icon = 'whatshot';
  }
  
  // Weather condition adjustments
  if (weatherCondition.includes('rain')) {
    recommendation.accessories.push('Rain jacket', 'Umbrella', 'Waterproof shoes');
    recommendation.advice += ' Don\'t forget rain protection!';
    recommendation.icon = 'water_drop';
  } else if (weatherCondition.includes('snow')) {
    recommendation.accessories.push('Waterproof boots', 'Umbrella');
    recommendation.advice += ' Watch out for snow and slippery surfaces!';
    recommendation.icon = 'weather_snowy';
  } else if (weatherCondition.includes('thunderstorm')) {
    recommendation.accessories.push('Waterproof jacket', 'Sturdy umbrella');
    recommendation.advice += ' Be cautious of lightning and stay indoors if possible!';
    recommendation.icon = 'thunderstorm';
  } else if (weatherCondition.includes('clear') && temperature > 20) {
    recommendation.accessories.push('Sunscreen', 'Sunglasses');
    recommendation.advice += ' Don\'t forget sun protection!';
    recommendation.icon = 'wb_sunny';
  }
  
  // Wind adjustments
  if (windSpeed > 10) {
    recommendation.accessories.push('Windbreaker');
    recommendation.advice += ' It\'s windy today!';
  }
  
  return recommendation;
};
