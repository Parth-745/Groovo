import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";

export const listProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      discount,
      sort = "newest",
      limit = 20,
      page = 1,
    } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (discount) filter.discount = { $gte: Number(discount) };

    const sortMap = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      popularity: { createdAt: -1 },
      newest: { createdAt: -1 },
    };

    const items = await ProductModel.find(filter)
      .sort(sortMap[sort] || sortMap.newest)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await ProductModel.countDocuments(filter);

    res.json({ success: true, data: items, total });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const item = await ProductModel.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, category, stock, imageURL, isActive } =
      req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Name, price, and category are required" });
    }

    const categoryExists = await CategoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      discount: discount || 0,
      category,
      stock: stock ?? 0,
      imageURL: Array.isArray(imageURL) ? imageURL : imageURL ? [imageURL] : [],
      isActive: isActive ?? true,
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.imageURL && !Array.isArray(payload.imageURL)) {
      payload.imageURL = [payload.imageURL];
    }
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
