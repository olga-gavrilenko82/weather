import { useEffect, useState } from 'react'
import './App.css'
import Buttons from './components/Buttons/Buttons'
import Forecast from './components/Forecast/Forecast'
import Inputs from './components/Inputs/Inputs'
import TemperatureAndDetails from './components/TemperatureAndDetails/TemperatureAndDetails'
import TimeAndLocation from './components/TimeAndLocation/TimeAndLocation'
import getFormattedWeatherData from './services/weatherService'

function App() {
  const [query, setQuery] = useState({ q: 'mogilev' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data)
      })
    }

    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if (!weather)
      return "bg-[url('https://i.jauns.lv/t/2022/06/15/2622220/480x345.webp?v=1655269913')]"
    const threshold = units === 'metric' ? 25 : 40
    if (weather.temp <= threshold)
      return "bg-[url('https://i.jauns.lv/t/2022/06/15/2622220/480x345.webp?v=1655269913')]"
    return "bg-[url('https://media.istockphoto.com/videos/sunlight-bright-orange-background-loop-video-id1208063775?s=640x640')] "
  }

  return (
    <>
      <div
        className={`flex mx-auto max-w-screen-lg items-center  bg-cover flex-col ${formatBackground()}`}
      >
        <Buttons setQuery={setQuery} />
        <Inputs setQuery={setQuery} />

        {weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            <Forecast title="HOURLY FORECAST" items={weather.hourly} />
            <Forecast title="DAILY FORECAST" items={weather.daily} />
          </>
        )}
      </div>
    </>
  )
}

export default App
