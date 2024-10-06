import { Request, Response, NextFunction } from "express";

/**
 * Middleware to apply custom security headers to the response.
 * Sets the Content-Security-Policy header to restrict content sources.
 *
 * @param req - The request object from Express.
 * @param res - The response object from Express.
 * @param next - The next function to call the next middleware or route handler.
 * @returns Calls the next middleware or route handler.
 */
const applySecurityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'"
  );

  next(); // Proceed to the next middleware or route handler
};

export default applySecurityHeaders;
