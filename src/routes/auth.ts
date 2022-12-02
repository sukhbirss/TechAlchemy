import {
    registerUser,
    loginUser,
    refreshToken,
    test,
} from '../controllers/auth'
import express from 'express'
import { authorize, protect } from '../middleware/auth'


const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/refresh').get(refreshToken)
router.route('/test').get(protect, authorize('USER'), test)


export default router
