import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    };
    load();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  const price = product.price - (product.discount || 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.imageURL?.[0] || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-80 object-cover rounded"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-semibold">₹{price}</p>
          {product.discount ? (
            <p className="text-sm text-gray-500">
              Original: ₹{product.price} (-{product.discount})
            </p>
          ) : null}
          <button
            onClick={() => addItem(product._id, 1)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;





