import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../utils/api";

const Checkout = () => {
  const { items, syncFromServer } = useCart();
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      await api.post("/orders", { address });
      await syncFromServer();
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {Object.keys(address).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium capitalize">{key}</label>
              <input
                name={key}
                value={address[key]}
                onChange={handleChange}
                className="border rounded p-2"
              />
            </div>
          ))}
        </div>
        <div className="border rounded p-4">
          <p className="font-semibold mb-2">Items: {items.length}</p>
          <button
            disabled={loading}
            onClick={placeOrder}
            className="w-full bg-emerald-600 text-white py-2 rounded disabled:opacity-60"
          >
            Place Order (COD)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;





