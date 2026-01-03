import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (!res.success) {
      setError(res.message);
      return;
    }
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Admin Login</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border rounded p-2 w-full"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border rounded p-2 w-full"
        />
        <button className="w-full bg-emerald-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;





