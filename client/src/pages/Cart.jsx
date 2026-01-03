import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../utils/api";

const Cart = () => {
  const { items, updateItem, removeItem, syncFromServer } = useCart();
  const [detailed, setDetailed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const productIds = items.map((i) => i.productId);
      const responses = await Promise.all(
        productIds.map((id) => api.get(`/products/${id}`).catch(() => null))
      );
      const map = responses
        .filter(Boolean)
        .reduce((acc, res) => ({ ...acc, [res.data.data._id]: res.data.data }), {});
      const enriched = items.map((i) => ({
        ...i,
        product: map[i.productId],
      }));
      setDetailed(enriched);
    };
    load();
  }, [items]);

  const subtotal = detailed.reduce((sum, i) => {
    const price = i.product ? i.product.price - (i.product.discount || 0) : 0;
    return sum + price * i.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
      {detailed.length === 0 ? (
        <p>
          Cart is empty. <Link to="/products" className="text-emerald-600">Browse products</Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {detailed.map((item) => (
              <div key={item.productId} className="border rounded p-3 flex gap-4">
                <img
                  src={item.product?.imageURL?.[0] || "https://via.placeholder.com/120"}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.product?.name || "Product"}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.product ? item.product.price - (item.product.discount || 0) : 0}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateItem(item.productId, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateItem(item.productId, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-4 text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border rounded p-4">
            <p className="font-semibold mb-2">Order Summary</p>
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-emerald-600 text-white py-2 rounded"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={syncFromServer}
              className="mt-2 w-full text-sm text-emerald-700"
            >
              Sync with account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;





