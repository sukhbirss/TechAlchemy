import { Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import newsApi from '../config/initNewsAPi'
import { fetchNewsHeadlines } from '../utils/news'

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