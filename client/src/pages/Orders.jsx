import { useEffect, useState } from "react";
import { api } from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/orders");
      setOrders(res.data.data || []);
    };
    load();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="border rounded p-4">
            <p className="font-semibold">Order #{o._id}</p>
            <p className="text-sm text-gray-600">Status: {o.status}</p>
            <p className="text-sm text-gray-600">
              Total: ₹{o.totalAmount} • Items: {o.items?.length}
            </p>
          </div>
        ))}
        {orders.length === 0 && <p>No orders yet.</p>}
      </div>
    </div>
  );
};

export default Orders;





