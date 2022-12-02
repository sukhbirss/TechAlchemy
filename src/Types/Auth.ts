import { Request, Response } from 'express'
import { IUserDocument } from './User'

export interface ISendAdminTokenResponse {
  user: IUserDocument,
  statusCode: number,
  sendRefreshToken: boolean | null,
  res: Response,
}

export interface ProtectedRequest extends Request {
  user: IUserDocument
}

export interface ITokenDecode {
  id: string
  exp: number
  iat: number
}


export interface ITokenPayload {
  id: string,
  userType: string,
}