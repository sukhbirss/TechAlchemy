import { NextFunction, Request, Response } from 'express'
import ErrorResponse from '../utils/errorResponse'

const errorHandeler = (
  // eslint-disable-next-line
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) => {
  let error: ErrorResponse = { ...err }

  error.message = err.message

  // Log to console for dev
  if (err.name) console.log(err.name.red.bold)

  // colsole log error
  console.error(err)

  // Mongos bad object ID
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongos duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400)
  }

  // Mongos validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      // @ts-ignore
      .map((val) => val.message)
      .join(' && ')
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  })
}

export default errorHandeler
