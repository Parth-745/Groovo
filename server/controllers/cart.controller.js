import CartModel from "../models/cartProduct.model.js";
import ProductModel from "../models/product.model.js";

export const getCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await CartModel.findOne({ userId })
    .populate("items.productId")
    .lean();
  res.json({ success: true, data: cart || { userId, items: [] } });
};

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;

  const product = await ProductModel.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const cart = await CartModel.findOne({ userId });
  if (!cart) {
    const created = await CartModel.create({
      userId,
      items: [{ productId, quantity }],
    });
    return res.status(201).json({ success: true, data: created });
  }

  const existing = cart.items.find((item) => item.productId.equals(productId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  await cart.save();
  res.json({ success: true, data: cart });
};

export const updateCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const cart = await CartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const item = cart.items.find((i) => i.productId.equals(productId));
  if (!item) return res.status(404).json({ success: false, message: "Item not found" });

  item.quantity = quantity;
  await cart.save();
  res.json({ success: true, data: cart });
};

export const removeCartItem = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const cart = await CartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  cart.items = cart.items.filter((item) => !item.productId.equals(id));
  await cart.save();
  res.json({ success: true, data: cart });
};
