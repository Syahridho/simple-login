import { MdVerified } from "react-icons/md";

const PopUpRegister = ({ onClick, title }) => {
  return (
    <div
      className="bg-slate-100 bg-transparent absolute top-0 left-0 w-screen h-screen flex justify-center items-center"
      onClick={onClick}
    >
      <div className="w-56 h-64 px-4 py-6 bg-white border flex flex-col items-center justify-between rounded-md">
        <div className="flex flex-col items-center ">
          <h1 className="mb-4">{title}</h1>
          <MdVerified className="text-green-400 w-24 h-24" />
        </div>
        <button
          className="bg-red-500 w-full text-white py-2 rounded hover:bg-red-300"
          onClick={onClick}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default PopUpRegister;
