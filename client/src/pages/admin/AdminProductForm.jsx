import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
    stock: 0,
    imageURL: [],
    isActive: true,
  });

  useEffect(() => {
    const load = async () => {
      const cats = await api.get("/categories");
      setCategories(cats.data.data || []);
      if (isEdit) {
        const res = await api.get(`/products/${id}`);
        setForm({ ...res.data.data, imageURL: res.data.data.imageURL || [] });
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setForm((prev) => ({ ...prev, imageURL: [...prev.imageURL, res.data.url] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await api.put(`/products/${id}`, form);
    } else {
      await api.post("/products", form);
    }
    navigate("/admin/products");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Product</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border rounded p-2 w-full"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded p-2 w-full"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded p-2 w-full"
            type="number"
          />
          <input
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount"
            className="border rounded p-2 w-full"
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border rounded p-2 w-full"
            type="number"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>
        <div>
          <input type="file" onChange={handleUpload} />
          <div className="flex gap-2 mt-2">
            {form.imageURL.map((url) => (
              <img key={url} src={url} alt="product" className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;





