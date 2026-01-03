import CategoryModel from "../models/category.model.js";

export const listCategories = async (_req, res) => {
  try {
    const data = await CategoryModel.find().lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, imageURL } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Name required" });
    }
    const cat = await CategoryModel.create({ name, imageURL });
    res.status(201).json({ success: true, data: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const cat = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cat) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const cat = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
