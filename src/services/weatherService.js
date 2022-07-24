import { DateTime } from 'luxon'

const API_KEY = '89668b370ca7d4a370f7aea3fe391045'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

/* https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=89668b370ca7d4a370f7aea3fe391045&units=metric */

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType)
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

  return fetch(url).then((res) => res.json())
}

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, humidity },
    name,
    dt,
    sys: { country },
    weather,
    wind: { speed },
  } = data

  const { main: details, icon } = weather[0]

  return {
    lat,
    lon,
    temp,
    feels_like,
    humidity,
    name,
    dt,
    country,
    details,
    icon,
    speed,
  }
}

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data
  daily = daily.slice(1, 6).map((i) => {
    return {
      title: formatToLocalTime(i.dt, timezone, 'ccc'),
      temp: i.temp.day,
      icon: i.weather[0].icon,
    }
  })

  hourly = hourly.slice(1, 6).map((i) => {
    return {
      title: formatToLocalTime(i.dt, timezone, 'hh:mm a'),
      temp: i.temp,
      icon: i.weather[0].icon,
    }
  })

  return { timezone, daily, hourly }
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams,
  ).then(formatCurrentWeather)

  const { lat, lon } = formattedCurrentWeather

  const formattedForecastWeather = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: 'current,minutely,alerts',
  }).then(formatForecastWeather)

  return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a",
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export { formatToLocalTime, iconUrlFromCode }
