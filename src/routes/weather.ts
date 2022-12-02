import {
    getWeather,
} from '../controllers/weather'
import express from 'express'


const router = express.Router()

router.route('/').get(getWeather)


export default router
