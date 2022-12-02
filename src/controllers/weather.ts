import { Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import { statusResponse, urlConfig } from '../utils/constants'
import axios from 'axios'
import { IWeatherItem } from '../Types/Weather'
const { weatherApi } = urlConfig
const { BAD_REQUEST, OK } = statusResponse

// @desc      Login User
// @route     POST /v2/auth/login
// @access    Public
export const getWeather = asyncHandler(
  async (req: Request, res: Response) => {
    let { data } = await axios.get(weatherApi)
    data = data.list.map((item:IWeatherItem)=> {
      return {
        date: item.dt_txt,
        main: item.weather.main,
        temp: item.main.temp
      }
    })
    return res.status(200).json({
      success: true,
      data
    })
  },
)