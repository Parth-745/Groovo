import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";

const statuses = ["Pending", "Packed", "Out for Delivery", "Delivered"];

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/orders/all");
      const found = res.data.data.find((o) => o._id === id);
      setOrder(found);
    };
    load();
  }, [id]);

  const updateStatus = async (status) => {
    await api.put(`/orders/status/${id}`, { status });
    navigate("/admin/orders");
  };

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Order #{order._id}</h1>
      <p className="mb-2">Status: {order.status}</p>
      <div className="flex gap-2 mb-4">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => updateStatus(s)}
            className="px-3 py-1 border rounded"
          >
            {s}
          </button>
        ))}
      </div>
      <div>
        <p className="font-semibold mb-2">Items</p>
        {order.items?.map((i) => (
          <div key={i.productId} className="text-sm text-gray-700">
            {i.productId} x {i.quantity} = ₹{i.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderDetail;





