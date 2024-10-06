import { Request, Response, NextFunction } from "express";

/**
 * Middleware to enforce a maximum payload size for incoming requests.
 * Rejects requests with a payload size larger than the defined maximum size.
 *
 * @param req - The request object from Express.
 * @param res - The response object from Express.
 * @param next - The next function to call the next middleware or route handler.
 * @returns Calls the next middleware or route handler, or sends a 403 status if payload size exceeds the limit.
 */
const enforcePayloadSizeLimit = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1 MB

  const contentLength = req.headers["content-length"];
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_SIZE) {
    res.sendStatus(403);
    return; // Forbidden
  }

  next();
};

export default enforcePayloadSizeLimit;
