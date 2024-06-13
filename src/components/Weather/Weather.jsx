import { useEffect, useState } from 'react';
import './style.css';
const { VITE_WEATHER_API_KEY } = import.meta.env;

export const Weather = ({ coordinatesY, coordinatesX, date }) => {
  const [weather, setWeather] = useState({
    temp: 0,
    icon: '',
  });

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coordinatesY}%2C%20${coordinatesX}/${date}/?unitGroup=metric&key=${VITE_WEATHER_API_KEY}&contentType=json&iconSet=icons1`,
      );
      const data = await response.json();
      setWeather({ temp: data.days[0].temp, icon: data.days[0].icon });
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-card">
      <img
        src={`/weather/img/${weather.icon}.png`}
        alt="weather icon"
        className="weather-icon"
      />
      <div className="temperature">{weather.temp} °C</div>
    </div>
  );
};
