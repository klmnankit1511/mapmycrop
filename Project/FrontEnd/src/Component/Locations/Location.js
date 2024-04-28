import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'; // Import Redirect
import axios from 'axios';
import './Location.css';

const Location = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false); // State for redirect
  var access_token = ""

  useEffect(() => {
    // Check if access token is null
    access_token = localStorage.getItem("access_token");
    if (!access_token) {
      // Set redirectToLogin to true if access token is null
      setRedirectToLogin(true);
    }
  }, []);

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const showPosition = (position) => {
    const { latitude, longitude } = position.coords;
    const input = {
      latitude: latitude,
      longitude: longitude,
      start_date: startDate,
      end_date: endDate
    };
    console.log(access_token);

    axios.post('http://localhost:8000/getweather/', input, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => {
      setWeatherData(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  if (redirectToLogin) {
    // Redirect to login page if redirectToLogin is true
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className='weather'>
        <div className='weather__input'>
          <div className='weather__input__div'>
            <div className='weather__input__text1 input__date'>
              <input id='dateStart' type='date' onChange={(e) => setStartDate(e.target.value)}></input>
            </div>
            <div className='weather__input__text2 input__date'>
              <input id='dateEnd' type='date' onChange={(e) => setEndDate(e.target.value)}></input>
            </div>
            <div className='weather__input__button input__date'>
              <button onClick={getLocation}>Get Weather</button>
            </div>
          </div>
        </div>
        <div className='weather__output'>
          {weatherData?.map((data, index) => (
            <div className='weather__output__card'>
              <div className='weather__output__card__date'>{data[0].split("T")[0]}</div>
              <div className='weather__output__card__time'>{data[0].split("T")[1]}</div>
              <div className='weather__output__card__temp'>{data[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Location;
