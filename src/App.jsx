import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VoucherIndex from "./pages/VoucherIndex";
import EditVoucher from "./pages/EditVoucher";
import VoucherForm from "./components/VoucherForm";

function Home() {
  return <h1 className="text-center mt-10 text-2xl">Home Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/voucher/create" element={<VoucherForm />} />
          <Route path="/voucher/edit" element={<EditVoucher />} />
        </Route>
      </Routes>
      ;
    </BrowserRouter>
  );
}

export default App;
