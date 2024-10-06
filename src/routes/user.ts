import { Router } from "express";
import {
  delete_user,
  get_user,
  login_user,
  patch_user,
  put_user,
  register_user,
} from "../controllers/userController";

const router: Router = Router();

router.get("/:id", get_user);
router.put("", put_user);
router.patch("", patch_user);
router.delete("/:id", delete_user);

router.post("/register", register_user);
router.post("/login", login_user);

export default router;
