import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Applies a specific timeout for request and response
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function
 */
function applyTimeout(req: Request, res: Response, next: NextFunction) {
  req.setTimeout(10000);
  res.setTimeout(10000);

  next();
}

export default applyTimeout;
