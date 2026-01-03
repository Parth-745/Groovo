import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).lean();

    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: true,
    });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user?.role?.toLowerCase() !== "admin") {
    return res
      .status(403)
      .json({ message: "Admin only", success: false, error: true });
  }
  next();
};
