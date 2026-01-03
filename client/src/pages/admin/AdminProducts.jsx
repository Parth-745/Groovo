import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <Link to="/admin/products/add" className="bg-emerald-600 text-white px-3 py-2 rounded">
          Add Product
        </Link>
      </div>
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p._id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-600">₹{p.price}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/admin/products/edit/${p._id}`}
                className="text-sm text-emerald-700"
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(p._id)} className="text-sm text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;





