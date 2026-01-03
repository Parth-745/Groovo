import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    imageURL: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel;