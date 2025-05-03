import React, { useRef } from 'react'
import './Weather.css'
import { useState, useEffect } from 'react'
import search_icon from '../assets/search-icon.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import sunny_icon from '../assets/sunny.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if (!city){
            alert("Please enter a city name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
    
            if (!response.ok) {
                // Handle HTTP errors
                const errorData = await response.json();
                throw new Error(errorData.message || 'API error');
            }
    
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon; // Default to clear_icon if not found
            const weatherIcon = document.querySelector('.weather-icon');
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                country: data.sys.country,
                icon: icon,
            });
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }
    

    useEffect(() => {
        search(inputRef.current.value)
    }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder='Search' ref={inputRef}/>
            <img src={search_icon} alt="search_icon" onClick={ () => {search(inputRef.current.value)}}/>
        </div>

        {weatherData? <>
            <img src={weatherData.icon} alt="weather-icon" className='weather-icon' />
            <p className='temperature'>{weatherData.temp}°C</p>
            <p className='location'>{weatherData.location}, {weatherData.country}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="humidity" className='weather-data-icon'/>
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="wind" className='weather-data-icon'/>
                    <div>
                        <p>{weatherData.windSpeed}km/hr</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </> : <></>}
        
    </div>
  )
}

export default Weather
