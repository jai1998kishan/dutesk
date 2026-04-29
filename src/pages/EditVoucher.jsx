import { useLocation } from "react-router-dom";
import VoucherForm from "../components/VoucherForm";

const EditVoucher = () => {
  const { state } = useLocation();

  return <VoucherForm editData={state} />;
};

export default EditVoucher;
