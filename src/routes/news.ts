import {
    registerUser,
    loginUser,
    refreshToken,
    test,
} from '../controllers/auth'
import express from 'express'
import { authorize, protect } from '../middleware/auth'
import { getNewsByQuery, getTopHeadlines } from '../controllers/news'


const router = express.Router()


/**
 * @swagger
 * tags:
 *  name: NEWS
 *  description: News END POINTS
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      TopHeadlinesResponse:
 *        type: object
 *        example:
 *          success: true
 *          data:
 *            status: ok
 *            totalResults: 32
 *            articles: data in array of objects
 * 
 *      GetNewsByQueryResponse:
 *        type: object
 *        example:
 *          success: true
 *          data:
 *            status: ok
 *            totalResults: 32
 *            articles: data in array of objects
 */


/**
 * @swagger
 * /v1/news/topheadlines:
 *   get:
 *     tags: [NEWS]
 *     summary: Get topHeadlines News
 *
 *     responses:
 *       202:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TopHeadlinesResponse'
 */
router.route('/topheadlines').get(protect, getTopHeadlines)

/**
 * @swagger
 * /v1/news/:
 *   get:
 *     tags: [NEWS]
 *     summary: Get News
 *     parameters:
 *      -  in: query
 *         name: search
 *         type: string
 *         description: text you want to search
 * 
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetNewsByQueryResponse'
 */
router.route('/').get(protect, getNewsByQuery)


export default router
