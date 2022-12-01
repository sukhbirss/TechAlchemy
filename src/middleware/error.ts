import { Request, Response, NextFunction, Errback } from "express";
import ErrorResponse from "../utils/errorResponse";

interface Error extends Errback {
  message: string;
  code: number;
  errors: Array<any>;
  statusCode: number;
  name: string;
  value: string | number;
}

const errorHandeler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.name.red.bold);

  // colsole log error
  console.log(err);

  // Mongos bad object ID
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    // error = new ErrorResponse(message, 404);
  }

  // Mongos duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    // error = new ErrorResponse(message, 400);
  }

  // Mongos validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    // error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandeler;
