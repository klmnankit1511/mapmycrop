from fastapi import FastAPI, HTTPException
from typing import List, Dict, Any
from datetime import datetime, timedelta
import openmeteo_requests
import requests_cache
import pandas as pd
from retry_requests import retry

app = FastAPI()

def temperature(latitude: float, longitude: float, start_date: str, end_date: str) -> Any:
    cache_session = requests_cache.CachedSession('.cache', expire_after=-1)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)

    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": "temperature_2m"
    }
    responses = openmeteo.weather_api(url, params=params)

    response = responses[0]

    hourly = response.Hourly()
    hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()

    hourly_data = {"date": pd.date_range(
        start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
        end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
        freq=pd.Timedelta(seconds=hourly.Interval()),
        inclusive="left"
    )}
    hourly_data["temperature_2m"] = hourly_temperature_2m

    hourly_dataframe = pd.DataFrame(data=hourly_data)
    hourly_data_dict = hourly_dataframe.to_dict(orient='records')

    historic_datas = [{
        'date': date.strftime('%Y-%m-%d'),
        'hourly_data': hourly_data_dict
    } for date in pd.date_range(start=start_date, end=end_date)]
    
    data = []
    for historic_data in historic_datas:
        for a in historic_data["hourly_data"]:
            data.append((a["date"] ,a["temperature_2m"]))
        break

    return data