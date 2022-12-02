import { Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import { statusResponse, urlConfig } from '../utils/constants'
import axios from 'axios'
import { IWeatherItem, IWeatherResponse } from '../Types/Weather'
const { weatherApi } = urlConfig
const { BAD_REQUEST, OK } = statusResponse

// @desc      Login User
// @route     POST /v2/auth/login
// @access    Public
export const getWeather = asyncHandler(
  async (req: Request, res: Response) => {
    const { data } = await axios.get(weatherApi)
    const datesVisited: string[] = []
    const weatherData:IWeatherResponse[] = []

    data.list.forEach((item: IWeatherItem) => {
      const date = item.dt_txt.split(' ')[0]
      if (!datesVisited.includes(date)) {
        datesVisited.push(date)
        weatherData.push({
          date: item.dt_txt,
          main: item.weather[0]?.main,
          temp: item.main?.temp
        })
      }
    })
    return res.status(200).json({
      success: true,
      data: weatherData
    })
  },
)