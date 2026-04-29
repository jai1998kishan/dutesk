import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VoucherIndex = () => {
  const role = (localStorage.getItem("role") || "").trim().toLowerCase();
  const isAdmin = role === "admin";

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    type: "ALL",
    mode: "ALL",
    accountHead: "ALL",
    narration: "",
    fromVocNo: "",
    toVocNo: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const [data, setData] = useState([]);

  // ✅ Load dummy data into localStorage (only once)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vouchers"));

    if (!stored || stored.length === 0) {
      const dummy = [
        {
          id: 1,
          group: "CASH",
          voucherNo: "V001",
          date: "2026-04-01",
          remarks: "Office Expense",
          closingBal: "5000",
          rows: [
            {
              account: "Cash",
              narration: "Stationary",
              billNo: "B001",
              amount: 500,
              mode: "Cash",
              reference: "Ref1",
              drcr: "DR",
              tdsApplicable: "No",
              tdsType: "",
            },
          ],
        },
        {
          id: 2,
          group: "BANK",
          voucherNo: "V002",
          date: "2026-04-02",
          remarks: "Client Payment",
          closingBal: "8000",
          rows: [
            {
              account: "Bank",
              narration: "Project Payment",
              billNo: "B002",
              amount: 1000,
              mode: "Bank",
              reference: "Ref2",
              drcr: "CR",
              tdsApplicable: "Yes",
              tdsType: "194C",
            },
          ],
        },
      ];

      localStorage.setItem("vouchers", JSON.stringify(dummy));
      setData(dummy);
    } else {
      setData(stored);
    }
  }, []);

  // 🔍 Apply Filters
  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  // 🔎 Filter Logic
  const filteredData = data.filter((item) => {
    return (
      (appliedFilters.type === "ALL" ||
        (item.rows[0]?.drcr === "DR" ? "Payment" : "Received") ===
          appliedFilters.type) &&
      (appliedFilters.mode === "ALL" ||
        item.rows[0]?.mode === appliedFilters.mode) &&
      (appliedFilters.accountHead === "ALL" ||
        item.rows[0]?.account === appliedFilters.accountHead) &&
      (!appliedFilters.narration ||
        item.rows[0]?.narration
          .toLowerCase()
          .includes(appliedFilters.narration.toLowerCase())) &&
      (!appliedFilters.fromDate || item.date >= appliedFilters.fromDate) &&
      (!appliedFilters.toDate || item.date <= appliedFilters.toDate) &&
      (!appliedFilters.fromVocNo ||
        item.voucherNo >= appliedFilters.fromVocNo) &&
      (!appliedFilters.toVocNo || item.voucherNo <= appliedFilters.toVocNo)
    );
  });

  const handleDelete = (id) => {
    if (!isAdmin) {
      toast.error("Only admin can delete");
      return;
    }

    if (window.confirm("Are you sure you want to delete?")) {
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
      localStorage.setItem("vouchers", JSON.stringify(updated));

      toast.success("Data is deleted successfully");
    }
  };
  return (
    <div className="p-4">
      <ToastContainer />

      <h2 className="text-xl font-bold mb-4">Voucher Entry | Index</h2>

      <div className="flex justify-end gap-2 mb-2">
        <button className="bg-yellow-500 text-white px-3 py-1">＋</button>
        <button className="bg-green-500 text-white px-3 py-1">Excel</button>
        <button className="bg-red-500 text-white px-3 py-1">PDF</button>
      </div>

      {/* Filters (unchanged UI) */}
      <div className="bg-purple-200 p-4 rounded mb-4 grid grid-cols-4 gap-3">
        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        />

        <select
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="ALL">Voucher Type</option>
          <option value="Payment">Payment</option>
          <option value="Received">Received</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
        >
          <option value="ALL">Mode</option>
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          onChange={(e) =>
            setFilters({ ...filters, accountHead: e.target.value })
          }
        >
          <option value="ALL">Account Head</option>
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
        </select>

        <input
          placeholder="From Voc No"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) =>
            setFilters({ ...filters, fromVocNo: e.target.value })
          }
        />

        <input
          placeholder="To Voc No"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setFilters({ ...filters, toVocNo: e.target.value })}
        />

        <input
          placeholder="Search Narration"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) =>
            setFilters({ ...filters, narration: e.target.value })
          }
        />

        <button
          onClick={handleSearch}
          className="bg-red-500 text-white px-4 py-2 col-span-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Table (UI unchanged) */}
      <table className="w-full border border-gray-400 border-collapse">
        <thead>
          <tr className="bg-purple-300">
            <th className="border p-2">VOC DATE</th>
            <th className="border p-2">VOC NO</th>
            <th className="border p-2">MODE</th>
            <th className="border p-2">TYPE</th>
            <th className="border p-2">ACCOUNT HEAD</th>
            <th className="border p-2">NARRATION</th>
            <th className="border p-2">DEBIT</th>
            <th className="border p-2">CREDIT</th>
            <th className="border p-2">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.voucherNo}</td>
                <td className="border p-2">{item.rows[0]?.mode}</td>
                <td className="border p-2">
                  {item.rows[0]?.drcr === "DR" ? "Payment" : "Received"}
                </td>
                <td className="border p-2">{item.rows[0]?.account}</td>
                <td className="border p-2">{item.rows[0]?.narration}</td>
                <td className="border p-2">
                  {item.rows[0]?.drcr === "DR" ? item.rows[0]?.amount : 0}
                </td>
                <td className="border p-2">
                  {item.rows[0]?.drcr === "CR" ? item.rows[0]?.amount : 0}
                </td>

                <td className="border p-2 text-center">
                  {isAdmin && (
                    <>
                      {/* ✅ Navigate to Edit Page */}
                      <button
                        onClick={() => {
                          if (!isAdmin) {
                            alert("Only admin can edit");
                            return;
                          }
                          navigate("/voucher/edit", { state: item });
                        }}
                        className="text-blue-600 mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-red-500 p-4">
                Data Not Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherIndex;
