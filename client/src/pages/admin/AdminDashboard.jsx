import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    const load = async () => {
      const ordersRes = await api.get("/orders/all");
      const orders = ordersRes.data.data || [];
      const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      setStats({ orders: orders.length, revenue, users: 0 });
    };
    load();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">₹{stats.revenue}</p>
        </div>
        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;





