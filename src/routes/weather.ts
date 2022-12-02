import {
  getWeather,
} from '../controllers/weather'
import express from 'express'


const router = express.Router()

/**
 * @swagger
 * tags:
 *  name: WEATHER
 *  description: Weather END POINTS
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      getWeather:
 *        type: object
 *        example:
 *          success: true
 *          data: [{"date": "2022-12-02 15:00:00", "main": "clear", "temp": 275.17}]
 * 
 */




/**
 * @swagger
 * /v1/weather:
 *   get:
 *     tags: [WEATHER]
 *     summary: Get 5 Days Weather Forcasr
 *
 *     responses:
 *       202:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getWeather'
 */
router.route('/').get(getWeather)


export default router
