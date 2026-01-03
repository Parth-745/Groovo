import { Router } from "express";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);
router.get("/", getCart);
router.post("/", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove/:id", removeCartItem);

export default router;





