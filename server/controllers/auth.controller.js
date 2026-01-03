import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefereshToken from "../utils/generateRefereshToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Email already registered", success: false });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      phone,
      password: hashed,
      role: "user",
    });

    return res.status(201).json({
      message: "Registration successful",
      success: true,
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefereshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
    };
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.json({
      message: "Login successful",
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Server error", success: false });
  }
};

export const me = async (req, res) => {
  const user = req.user;
  return res.json({
    success: true,
    data: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
  });
};
