import React from 'react'
import '../../components/Buttons/Buttons.css'

function Buttons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: 'Minsk',
    },
    {
      id: 2,
      title: 'Mogilev',
    },
    {
      id: 3,
      title: 'Gomel',
    },
    {
      id: 4,
      title: 'Brest',
    },
    {
      id: 5,
      title: 'Grodno',
    },
    {
      id: 6,
      title: 'Vitebsk',
    },
  ]

  return (
    <div className="buttons_container">
      {cities.map((city) => (
        <button
          key={city.id}
          className="btn"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  )
}

export default Buttons
