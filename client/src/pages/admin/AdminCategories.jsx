import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addCategory = async () => {
    await api.post("/categories", { name });
    setName("");
    load();
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    load();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border rounded p-2"
        />
        <button onClick={addCategory} className="bg-emerald-600 text-white px-3 py-2 rounded">
          Add
        </button>
      </div>
      <div className="space-y-2">
        {categories.map((c) => (
          <div key={c._id} className="border rounded p-3 flex justify-between">
            <span>{c.name}</span>
            <button onClick={() => deleteCategory(c._id)} className="text-red-600 text-sm">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;





