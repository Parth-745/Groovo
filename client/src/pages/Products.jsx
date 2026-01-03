import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";

const filtersInit = { category: "", sort: "newest", minPrice: "", maxPrice: "" };

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(filtersInit);

  const fetchData = async () => {
    const res = await api.get("/products", { params: filters });
    setProducts(res.data.data || []);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select name="sort" value={filters.sort} onChange={handleChange} className="border rounded p-2">
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>

        <div className="flex gap-2">
          <input
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            className="border rounded p-2 w-32"
          />
          <input
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            className="border rounded p-2 w-32"
          />
        </div>
        <button className="text-sm text-emerald-600" onClick={() => setFilters(filtersInit)}>
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link
            to={`/products/${p._id}`}
            key={p._id}
            className="border rounded-lg p-3 hover:shadow"
          >
            <img
              src={p.imageURL?.[0] || "https://via.placeholder.com/200"}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-2">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-600">₹{p.price - (p.discount || 0)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;





