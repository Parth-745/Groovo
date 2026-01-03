import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../middleware/auth.js";
import { upload, uploadImage } from "../controllers/upload.controller.js";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, upload.single("image"), uploadImage);

export default router;





