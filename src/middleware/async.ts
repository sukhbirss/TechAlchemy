import { Request, Response, NextFunction } from "express";
interface ProtectedRequest extends Request {
  user?: object;
}
const asyncHandler =
  (fn: Function) =>
  (req: Request | ProtectedRequest, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
