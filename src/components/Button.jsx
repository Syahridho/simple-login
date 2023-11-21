import { FaCircleNotch } from "react-icons/fa";

const Button = ({ title, onClick, loading }) => {
  if (loading === true) {
    return (
      <button className="bg-slate-800 text-white py-1.5 flex items-center justify-center gap-4 hover:bg-slate-950">
        Loading...
        <FaCircleNotch className="animate-spin text-white" />
      </button>
    );
  }
  return (
    <button
      className="bg-slate-800 text-white py-1.5 hover:bg-slate-950"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
