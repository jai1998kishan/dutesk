import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const VoucherForm = ({ editData }) => {
  const [voucherType, setVoucherType] = useState("Payment");
  const navigate = useNavigate();

  const [form, setForm] = useState(
    editData || {
      group: "CASH",
      voucherNo: "1",
      date: "2026-04-29",
      remarks: "",
      accountHead: "",
      closingBal: "",
    },
  );

  const [rows, setRows] = useState(
    editData?.rows || [
      {
        account: "",
        narration: "On Account",
        billNo: "",
        amount: "",
        mode: "",
        reference: "",
        drcr: "DR",
        tdsApplicable: "No",
        tdsType: "",
      },
    ],
  );

  const addRow = () => {
    setRows([
      ...rows,
      {
        account: "",
        narration: "On Account",
        billNo: "",
        amount: "",
        mode: "",
        reference: "",
        drcr: "DR",
        tdsApplicable: "No",
        tdsType: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNarrationFocus = (index) => {
    const updated = [...rows];
    if (updated[index].narration === "On Account") {
      updated[index].narration = "";
    }
    setRows(updated);
  };

  const totalDR = rows.reduce(
    (sum, r) => (r.drcr === "DR" ? sum + Number(r.amount || 0) : sum),
    0,
  );

  const totalCR = rows.reduce(
    (sum, r) => (r.drcr === "CR" ? sum + Number(r.amount || 0) : sum),
    0,
  );

  const handleSave = () => {
    const voucher = {
      id: editData?.id || Date.now(),
      ...form,
      rows,
    };

    let stored = JSON.parse(localStorage.getItem("vouchers")) || [];

    if (editData) {
      stored = stored.map((v) => (v.id === voucher.id ? voucher : v));
    } else {
      stored.push(voucher);
    }

    localStorage.setItem("vouchers", JSON.stringify(stored));

    toast.success("Data is deleted successfully");
    navigate("/dashboard");
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Voucher Entry</h2>

      <div className="flex gap-2 mb-4">
        <button className="bg-red-500 text-white px-3 py-1">Show All</button>
        <button className="bg-yellow-500 text-white px-3 py-1">
          Add New Voucher
        </button>
        <button className="bg-red-600 text-white px-3 py-1">
          Create Account
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2 mb-4">
        <input
          value={form.group}
          onChange={(e) => handleFormChange("group", e.target.value)}
          className="border p-2"
        />
        <input
          value={form.voucherNo}
          onChange={(e) => handleFormChange("voucherNo", e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => handleFormChange("date", e.target.value)}
          className="border p-2"
        />

        <select
          value={voucherType}
          onChange={(e) => setVoucherType(e.target.value)}
          className="border p-2"
        >
          <option>Payment</option>
          <option>Received</option>
        </select>

        <input
          value={form.remarks}
          onChange={(e) => handleFormChange("remarks", e.target.value)}
          placeholder="Remarks"
          className="border p-2"
        />

        <input
          value={form.closingBal}
          onChange={(e) => handleFormChange("closingBal", e.target.value)}
          placeholder="Closing Bal"
          className="border p-2"
        />
      </div>

      <table className="w-full border border-gray-400 border-collapse">
        <thead>
          <tr className="bg-purple-200">
            <th className="border p-2">Account Head</th>
            <th className="border p-2">Narration</th>
            <th className="border p-2">Bill No</th>
            <th className="border p-2">Amt</th>
            <th className="border p-2">Mode</th>
            <th className="border p-2">Reference No</th>
            <th className="border p-2">DR/CR</th>
            <th className="border p-2">TDS</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <select
                  value={row.account}
                  onChange={(e) =>
                    handleChange(index, "account", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank">Bank</option>
                </select>
              </td>

              <td className="border p-2">
                <input
                  value={row.narration}
                  onFocus={() => handleNarrationFocus(index)}
                  onChange={(e) =>
                    handleChange(index, "narration", e.target.value)
                  }
                  className="w-full"
                />
              </td>

              <td className="border p-2">
                <input
                  value={row.billNo}
                  onChange={(e) =>
                    handleChange(index, "billNo", e.target.value)
                  }
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  value={row.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                />
              </td>

              <td className="border p-2">
                <input
                  value={row.mode}
                  onChange={(e) => handleChange(index, "mode", e.target.value)}
                />
              </td>

              <td className="border p-2">
                <input
                  value={row.reference}
                  onChange={(e) =>
                    handleChange(index, "reference", e.target.value)
                  }
                />
              </td>

              <td className="border p-2">
                <select
                  value={row.drcr}
                  onChange={(e) => handleChange(index, "drcr", e.target.value)}
                >
                  <option value="DR">DR</option>
                  <option value="CR">CR</option>
                </select>
              </td>

              <td className="border p-2">
                <select
                  value={row.tdsApplicable}
                  onChange={(e) =>
                    handleChange(index, "tdsApplicable", e.target.value)
                  }
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>

                {row.tdsApplicable === "Yes" && (
                  <select
                    value={row.tdsType}
                    onChange={(e) =>
                      handleChange(index, "tdsType", e.target.value)
                    }
                    className="mt-1"
                  >
                    <option value="">Select</option>
                    <option value="194C">194C</option>
                    <option value="194J">194J</option>
                  </select>
                )}
              </td>

              <td className="border p-2 text-center">
                <button onClick={addRow} className="text-blue-600 mr-2">
                  +
                </button>
                {rows.length > 1 && (
                  <button
                    onClick={() => removeRow(index)}
                    className="text-red-600"
                  >
                    ×
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-4">
        <div>
          <label>Total DR Amt</label>
          <input value={totalDR} readOnly className="border p-2 ml-2" />
        </div>

        <div>
          <label>Total CR Amt</label>
          <input value={totalCR} readOnly className="border p-2 ml-2" />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2"
        >
          {editData ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default VoucherForm;
