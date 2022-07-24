import React, { useState } from 'react'
import './Inputs.css'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'

function Inputs({ setQuery }) {
  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city })
    
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon,
        })
      })
    }
  }

  return (
    <div className="input_conteiner">
      <input
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
        type="text"
        placeholder="Search for city...."
        className="input"
      />
      <UilSearch className="input_icons" onClick={handleSearchClick} />{' '}
      <UilLocationPoint className="input_icons" onClick={handleLocationClick} />{' '}
    </div>
  )
}

export default Inputs
