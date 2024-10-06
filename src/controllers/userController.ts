import { Request, Response } from "express";
import { User } from "../models/User";

export function get_user(req: Request, res: Response) {
  const userId = req.params["id"];
}

export function put_user(req: Request, res: Response) {
  const userId = req.params["id"];
}

export function patch_user(req: Request, res: Response) {
  const userId = req.params["id"];
}

export function delete_user(req: Request, res: Response) {
  const userId = req.params["id"];
}

export function register_user(req: Request, res: Response) {
  const body = req.body;
}

export async function login_user(req: Request, res: Response) {
  const body = req.body;
  const userExists = await User.query();
}
