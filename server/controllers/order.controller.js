import OrderModel from "../models/order.model.js";
import CartModel from "../models/cartProduct.model.js";
import ProductModel from "../models/product.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, address, paymentMethod = "COD" } = req.body;

    let sourceItems = items;
    if (!sourceItems) {
      const cart = await CartModel.findOne({ userId }).lean();
      sourceItems = cart?.items || [];
    }

    if (!sourceItems || !sourceItems.length) {
      return res
        .status(400)
        .json({ success: false, message: "No items to order" });
    }

    const detailedItems = [];
    for (const item of sourceItems) {
      const product = await ProductModel.findById(item.productId).lean();
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      const price = product.price - (product.discount || 0);
      detailedItems.push({
        productId: product._id,
        quantity: item.quantity,
        price,
      });
    }

    const totalAmount = detailedItems.reduce(
      (sum, i) => sum + (i.price || 0) * i.quantity,
      0
    );

    const order = await OrderModel.create({
      userId,
      items: detailedItems,
      totalAmount,
      address,
      status: "Pending",
      paymentMethod,
    });

    await CartModel.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  const userId = req.user._id;
  const data = await OrderModel.find({ userId }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data });
};

export const getAllOrders = async (_req, res) => {
  const data = await OrderModel.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data });
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ["Pending", "Packed", "Out for Delivery", "Delivered"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const order = await OrderModel.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!order) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: order });
};
