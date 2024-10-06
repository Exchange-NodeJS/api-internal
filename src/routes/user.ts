import { Router } from "express";
import {
  create_user,
  delete_user,
  get_user,
  patch_user,
  put_user,
} from "../controllers/userController";

const router: Router = Router();

router.post("", create_user);
router.get("/:id", get_user);
router.put("", put_user);
router.patch("", patch_user);
router.delete("/:id", delete_user);

export default router;
