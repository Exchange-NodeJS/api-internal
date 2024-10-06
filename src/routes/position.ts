import { Router } from "express";
import {
  create_position,
  delete_position,
  get_position,
  patch_position,
  put_position,
} from "../controllers/positionController";

const router: Router = Router();

router.post("", create_position);
router.get("/:id", get_position);
router.put("", put_position);
router.patch("", patch_position);
router.delete("/:id", delete_position);

export default router;
