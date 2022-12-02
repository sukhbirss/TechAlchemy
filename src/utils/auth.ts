import { ISendAdminTokenResponse } from '../Types/Auth'
import jwt from 'jsonwebtoken'
import { IUserDocument } from '../Types'

export function generateRandomString (length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength))
  }
  return result
}

export const sendTokenResponse = ({
  user,
  statusCode,
  res,
  sendRefreshToken,
}: ISendAdminTokenResponse) => {

  return res.status(statusCode).json({
    success: true,
    accessToken: user.getSignedJwtToken(),
    ...(sendRefreshToken && { refreshToken: user.getRefreshJwtToken() }),
  })
}

export const createSignedToken = (user: IUserDocument, userType: string, SECRET: string | undefined, EXPIRE_TIME: string | undefined) => {
  if (SECRET && EXPIRE_TIME)
    return jwt.sign(
      {
        id: user._id,
        userType,
      },
      SECRET + user.hash,
      {
        expiresIn: EXPIRE_TIME,
      },
    )
  else {
    throw new Error('Initialize JWT Secrets Failed')
  }
}