import { Router } from "express";
import {
  create_trade,
  delete_trade,
  get_trade,
  patch_trade,
  put_trade,
} from "../controllers/tradeController";

const router: Router = Router();

router.post("", create_trade);
router.get("/:id", get_trade);
router.put("", put_trade);
router.patch("", patch_trade);
router.delete("/:id", delete_trade);

export default router;
