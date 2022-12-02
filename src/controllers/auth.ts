import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/async'
import User from '../models/User'
import { IUserDocument } from '../Types'
import { ITokenPayload } from '../Types/Auth'
import { generateRandomString, sendTokenResponse } from '../utils/auth'
import { statusResponse } from '../utils/constants'
import ErrorResponse from '../utils/errorResponse'
const { BAD_REQUEST, OK } = statusResponse
// @desc      Register User
// @route     POST /v1/user1
// @access    Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      email,
      password,
    } = req.body

    if (!password) return next(new ErrorResponse('Add Password to register', BAD_REQUEST))
    if (!email) return next(new ErrorResponse('Add email to register', BAD_REQUEST))

    const user: IUserDocument | null = await User.findOne({
      ...(email && { email }),
    })
    if (user) return next(new ErrorResponse('User already exists', BAD_REQUEST))

    // Create User
    const createUser = {
      name: name,
      password: password,
      email: email,
    }

    const newUser = await User.create(createUser)
    // await sendEmailVerificationMail(newUser, clientId)
    return res.status(200).json({
      success: true,
      message: 'Account created succesfully',
    })
  },
)


// @desc      Login User
// @route     POST /v2/auth/login
// @access    Public
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, type } = req.body

    if (!password) return next(new ErrorResponse('password required', BAD_REQUEST))
    if (!email) return next(new ErrorResponse('Add email to register', BAD_REQUEST))

    const fieldToSearch = {
      ...(email && { email }),
    }
    // Check for user
    const user: IUserDocument | null = await User.findOne(fieldToSearch).select('+password')
    if (!user) return next(new ErrorResponse('user not found', BAD_REQUEST))
    if (type && user.role !== type) return next(new ErrorResponse(`This login is for ${type}`, BAD_REQUEST))
    if (user.isDisabled) return next(new ErrorResponse('This user is disabled please, connect admin for more details', 400))

    // Check if password is match
    const isMatch = await user.matchPassword(password)
    if (!isMatch) return next(new ErrorResponse('Invalid Credentials', BAD_REQUEST))

    await user.save()
    return sendTokenResponse({
      user,
      statusCode: OK,
      res,
      sendRefreshToken: true,
    })
  },
)


// @desc      Refresh Token
// @route     POST /v2/auth/refresh
// @access    Public
export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.refreshtoken
    // Make sure token exists
    if (!refreshToken || typeof refreshToken !== 'string') return next(new ErrorResponse('Refresh Token not found', 401))

    try{
      //extracting payload from JWT
      const payload = jwt.decode(refreshToken)
      const user: IUserDocument | null = await User.findById((<ITokenPayload>payload).id).select('+password')
      if (!user) return next(new ErrorResponse('User Not found', 404))
      //preparing custom secret of each user
      const secret:string | undefined = process.env.REFRESH_TOKEN_SECRET+ user.hash
      if(!secret) return next(new ErrorResponse('Malicious token', 401))
      const decoded = jwt.verify(refreshToken, secret) // eslint-disable-line
      //replacing tokenHash to have one time refresh token functinality
      user.hash = generateRandomString(15)
      await user.save()
      if (user.isDisabled) return next( new ErrorResponse('This user is disabled please, connect admin for more details',404))
      return sendTokenResponse({
        user,
        statusCode: OK,
        res,
        sendRefreshToken: true,
      })
    } catch(err) {
      return res.status(200).json({
        success: false,
        error: 'Token expired',
      })
    }
  },
)

// @desc      Login User
// @route     POST /v2/auth/login
// @access    Public
export const test = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      success: true,
    })
  },
)