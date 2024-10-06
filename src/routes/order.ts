import { Router } from "express";
import {
  create_order,
  delete_order,
  get_order,
  patch_order,
  put_order,
} from "../controllers/orderController";

const router: Router = Router();

router.post("", create_order);
router.get("/:id", get_order);
router.put("", put_order);
router.patch("", patch_order);
router.delete("/:id", delete_order);

export default router;
