import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/async'
import User from '../models/User'
import { IUserDocument } from '../Types'
import { ITokenPayload } from '../Types/Auth'
import { generateRandomString, sendTokenResponse } from '../utils/auth'
import { statusResponse } from '../utils/constants'
import ErrorResponse from '../utils/errorResponse'
import newsApi from '../config/initNewsAPi'
import cache from '../config/initNodeCache'
import { fetchNewsHeadlines } from '../utils/news'

const { BAD_REQUEST, OK } = statusResponse

// @desc      Login User
// @route     POST /v2/auth/login
// @access    Public
export const getTopHeadlines = asyncHandler(
  async (req: Request, res: Response) => {
    
    const data = await fetchNewsHeadlines()
    return res.status(200).json({
      success: true,
      data
    })
  },
)


export const getNewsByQuery = asyncHandler(
  async (req: Request, res: Response) => {
    const { search } = req.query
    let data
    if(!search) data = await fetchNewsHeadlines()
    else {
      data = await newsApi.everything({
        q: search,
        language: 'en',
      })
    }
    return res.status(200).json({
      success: true,
      data
    })
  },
)