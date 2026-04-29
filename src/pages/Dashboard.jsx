import { useNavigate } from "react-router-dom";
import VoucherForm from "../components/VoucherForm";
import VoucherIndex from "./VoucherIndex";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <p className="mb-4">Logged in as: {role}</p>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate("/voucher/create")}
          className="bg-green-500 text-white px-3 py-1 mr-2"
        >
          Create Voucher
        </button>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      <VoucherIndex />
    </div>
  );
};

export default Dashboard;
