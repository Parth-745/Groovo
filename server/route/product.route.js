import { Router } from "express";
import { adminOnly, auth } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { uploadArray, uploadToCloudinary } from "../utils/cloudinary.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", auth, adminOnly, uploadArray, uploadToCloudinary, createProduct);
router.put("/:id", auth, adminOnly, uploadArray, uploadToCloudinary, updateProduct);
router.delete("/:id", auth, adminOnly, deleteProduct);

export default router;

