import { NextFunction, Request, Response } from "express";

function applyWhitelist(req: Request, res: Response, next: NextFunction) {
  const valid_ips: string[] = process.env.VALID_IPS
    ? process.env.VALID_IPS.split(";").map((ip) => ip.trim())
    : [];
  const actualIP = req.headers["x-real-ip"] || req.ip;

  if (valid_ips.includes(actualIP as string)) next();
  else return res.sendStatus(403);
}

export default applyWhitelist;
