import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userInfo from "../data/user.data";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("username", username);
    console.log("password..", password);

    const userDetails = userInfo(username, password);
    console.log("user details...", userDetails);

    if (userDetails && userDetails.status === "ok") {
      localStorage.setItem("role", userDetails.role);
      localStorage.setItem("username", userDetails.username);

      setError("");
      navigate("/dashboard");
    } else {
      setError(userDetails.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-sm">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-3 py-2 border rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
