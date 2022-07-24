import React from 'react'
import { iconUrlFromCode } from '../../services/weatherService'
import '../Forecast/Forecast.css'

function Forecast({ title, items }) {
  console.log(items)
  return (
    <div className="forecast">
      <div className="title_container">
        <p className="title">{title}</p>
      </div>
      <hr className="hr" />
      <div className="components_container">
        {items.map((item, index) => (
          <div key={index} className="component_card">
            <p className="time">{item.title}</p>
            <img src={iconUrlFromCode(item.icon)} alt="iconUrlFromCode" />
            <p className="temp">{`${(item.temp - 273.15).toFixed()}°C`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
