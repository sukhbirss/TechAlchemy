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

router.route('/topheadlines').get(protect, getTopHeadlines)
router.route('/').get(protect, getNewsByQuery)


export default router
