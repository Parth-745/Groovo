import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { adminMiddleware, authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getMyOrders);
router.get("/all", authMiddleware, adminMiddleware, getAllOrders);
router.put("/status/:id", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;





