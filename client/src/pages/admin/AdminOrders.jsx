import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const res = await api.get("/orders/all");
    setOrders(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">All Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o._id} className="border rounded p-3 flex justify-between">
            <div>
              <p className="font-semibold">#{o._id}</p>
              <p className="text-sm text-gray-500">Status: {o.status}</p>
            </div>
            <Link to={`/admin/orders/${o._id}`} className="text-emerald-700 text-sm">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;





