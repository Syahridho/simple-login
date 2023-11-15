const ResetPassword = () => {
  return (
    <div className="grid justify-center gap-4 pt-4">
      <h1 className="font-medium text-2xl text-center">Reset Password</h1>
      <input type="text" className="border w-72" />
      <button className="border border-slate-800 bg-slate-800 text-white py-1 rounded">
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
