import { Response, NextFunction } from 'express'
import asyncHandler from './async'
import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/errorResponse'
import User from '../models/User'
import { ITokenPayload, ProtectedRequest } from '../Types/Auth'
import { IUserDocument } from '../Types'


export const protect =
  asyncHandler(
    async (req: ProtectedRequest, res: Response, next: NextFunction) => {
      let token
      // Condition for Bearer Token
      if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') )
        token = req.headers.authorization.split(' ')[1]

      // Make sure token exists
      if (!token) return next(new ErrorResponse('Not authorize to access this route', 401))

      try{
        const payload = jwt.decode(token)
        const user: IUserDocument | null = await User.findById((<ITokenPayload>payload).id)
        if (!user) return next(new ErrorResponse('User Not found', 404))
        const secret:string | undefined = process.env.ACCESS_TOKEN_SECRET + user.hash
        if(!secret) return next(new ErrorResponse('Malicious token', 401))
        const decoded = jwt.verify(token, secret) // eslint-disable-line

        if (user.isDisabled) return next( new ErrorResponse('This user is disabled please, connect admin for more details',404))
        req.user = user
        next()
      } catch(err) {
        return next(new ErrorResponse('Token expired', 401))
      }
    },
  )


// Grant access to specofoc roles
export const authorize = (...roles: [string]) => {
  return (req: ProtectedRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorResponse(
            `User role ${req.user.role} is not authorized to access this route`,
            403,
          ),
        )
      }
      next()
    } else {
      return next(
        new ErrorResponse(
          'This API is only applicable only Protected routes',
          403,
        ),
      )
    }
  }
}


