
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const API_KEY = '3150579b19a402a762a3de4bd7c1f2df';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

    const fetchWeatherData = async () => {
        try {
            console.log(`Fetching weather data for: ${city}`);
            const response = await axios.get(API_URL, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            console.log('API response:', response);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                setError(error.response.data.message);
            } else {
                setError('An error occurred while fetching weather data.');
            }
            setWeather(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className="weather-app">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Weather;
