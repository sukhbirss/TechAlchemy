import {
    registerUser,
    loginUser,
    refreshToken,
    test,
} from '../controllers/auth'
import express from 'express'
import { authorize, protect } from '../middleware/auth'


const router = express.Router()

/**
 * @swagger
 * tags:
 *  name: AUTH
 *  description: Auth END POINTS
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      RegisterRequest:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *
 *      LoginRequest:
 *        type: object
 *        example:
 *          email: string
 *          password: string
 * 
 *      LoginResponse:
 *         type: object
 *         properties:
 *           success:
 *             type: string
 *           accessToken:
 *             type: string
 *           refreshToken:
 *             type: string
 * 
 */



/**
 * @swagger
 * /v1/auth/register:
 *  post:
 *    tags: [AUTH]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterRequest'
 *
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterResponse'
 */

router.route('/register').post(registerUser)

/**
 * @swagger
 * /v1/auth/login:
 *  post:
 *    tags: [AUTH]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 */
router.route('/login').post(loginUser)

/**
 * @swagger
 * /v1/auth/refresh:
 *  post:
 *    tags: [AUTH]
 *    parameters:
 *      -  in: headers
 *         name: refreshToken
 *         type: string
 * 
 *
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 */
router.route('/refresh').get(refreshToken)
router.route('/test').get(protect, authorize('USER'), test)


export default router
