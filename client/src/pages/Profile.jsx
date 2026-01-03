import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <div className="border rounded p-4 space-y-2">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Role: {user.role}</p>
        <button onClick={logout} className="text-red-600 text-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;





