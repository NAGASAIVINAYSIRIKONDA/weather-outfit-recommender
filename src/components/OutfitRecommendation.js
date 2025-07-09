import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Chip,
  Zoom,
  useTheme
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { useWeather } from '../context/WeatherContext';
import { getOutfitRecommendation } from '../utils/outfitRecommender';

// Icon mapping
const iconMapping = {
  'wb_sunny': <WbSunnyIcon fontSize="large" />,
  'ac_unit': <AcUnitIcon fontSize="large" />,
  'water_drop': <WaterDropIcon fontSize="large" />,
  'whatshot': <WhatshotIcon fontSize="large" />,
  'device_thermostat': <DeviceThermostatIcon fontSize="large" />,
  'thunderstorm': <ThunderstormIcon fontSize="large" />,
};

const OutfitRecommendation = () => {
  const { weatherData } = useWeather();
  const theme = useTheme();
  
  if (!weatherData) {
    return null;
  }
  
  const recommendation = getOutfitRecommendation(weatherData);
  
  if (!recommendation) {
    return null;
  }
  
  const { tops, bottoms, accessories, advice, icon } = recommendation;
  
  return (
    <Zoom in={true} style={{ transitionDelay: '300ms' }}>
      <Card 
        elevation={3}
        sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          mb: 4,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1f2a40 0%, #121212 100%)' 
            : 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            {iconMapping[icon] || <DeviceThermostatIcon fontSize="large" />}
            <Typography variant="h4" sx={{ ml: 1 }}>
              Outfit Recommendation
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {advice}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }}>
            <Chip label="What to Wear" />
          </Divider>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ flex: 1, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Tops
              </Typography>
              <List dense>
                {tops.map((item, index) => (
                  <ListItem key={`top-${index}`}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ flex: 1, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Bottoms
              </Typography>
              <List dense>
                {bottoms.map((item, index) => (
                  <ListItem key={`bottom-${index}`}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Accessories
              </Typography>
              <List dense>
                {accessories.map((item, index) => (
                  <ListItem key={`accessory-${index}`}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Recommendations are based on current weather conditions and may need adjustments based on personal preference.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default OutfitRecommendation;
