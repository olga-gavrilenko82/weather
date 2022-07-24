import React from 'react'
import '../TemperatureAndDetails/TemperatureAndDetails.css'
import { UilTemperature, UilTear, UilWind } from '@iconscout/react-unicons'
import { iconUrlFromCode } from '../../services/weatherService'

function TemperatureAndDetails({
  weather: { details, icon, temp, speed, humidity, feels_like },
}) {
  return (
    <>
      <div className="details_container">
        <p className="details_text">{details}</p>
      </div>

      <div className="current__weather_container">
        <div className="current_weather">
          <img src={iconUrlFromCode(icon)} alt="iconUrlFromCode" />
        </div>
        <div className="current_weather">
          <p className="current__weather_text">
            {`${(temp - 273.15).toFixed()}°C`}
          </p>
        </div>

        <div className="current__weather_details_container">
          <div className="current__weather_details">
            <UilTemperature />
            Real fell: &nbsp;
            <span className="span">{`${(feels_like - 273.15).toFixed()}°C`}</span>
          </div>
          <div className="current__weather_details">
            <UilTear />
            Humidity: &nbsp;
            <span className="span">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="current__weather_details">
            <UilWind />
            Wind: &nbsp;
            <span className="span">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TemperatureAndDetails
