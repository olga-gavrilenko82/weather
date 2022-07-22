import React from 'react'
import { formatToLocalTime } from '../../services/weatherService'
import '../TimeAndLocation/TimeAndLocation.css'

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="time_container">
        <p className="time_text">{formatToLocalTime(dt, timezone)}</p>
      </div>
      <div className="time_container">
        <p className="location_text">{`${name}, ${country}`}</p>
      </div>
    </div>
  )
}

export default TimeAndLocation
