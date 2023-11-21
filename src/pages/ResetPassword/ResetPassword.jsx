import { useState } from "react";
import { resetPassword } from "../../config/redux/action/action";
import { connect } from "react-redux";
import Button from "../../components/Button";

const ResetPassword = ({ resetPass, isLoading }) => {
  const [email, setEmail] = useState("");
  const [emailSucces, setEmailSucces] = useState(false);
  const [emailFail, setEmailFail] = useState(false);

  const onChangeInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(email);
    setEmailSucces(false);
    setEmailFail(false);
    const res = await resetPass(email).catch((error) => error);
    console.log(res);
    if (res === true) {
      console.log("berhasil");
      setEmailSucces(true);
      setEmailFail(false);
      setEmail("");
    } else if (res === "auth/too-many-requests") {
      console.log("terlalu banyak percobaan");
      setEmailSucces(false);
      setEmailFail(true);
    } else {
      console.log("gagal");
    }
  };

  return (
    <div className="grid justify-center gap-4 pt-10">
      <h1 className="font-medium text-2xl text-center">Reset Password</h1>
      {emailFail ? (
        <div className="bg-red-400 text-white px-3 py-2 rounded border border-red-500 flex justify-between">
          <p>Terlalu banyak percobaan</p>
          <button onClick={() => setEmailFail(false)}>x</button>
        </div>
      ) : null}

      {emailSucces ? (
        <div className="bg-blue-400 text-blue-700 font-medium px-3 py-2 rounded border border-blue-500 flex justify-between">
          <p>Silahkan cek email anda</p>
          <button onClick={() => setEmailSucces(false)}>x</button>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Masukkan Email</label>
        <input
          type="email"
          name="email"
          className="border w-72 px-2 py-1"
          value={email}
          onChange={(e) => onChangeInput(e)}
        />
      </div>
      <Button
        title={"Reset Password"}
        onClick={handleSubmit}
        loading={isLoading}
      />
    </div>
  );
};

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  resetPass: (email) => dispatch(resetPassword(email)),
});

export default connect(reduxState, reduxDispatch)(ResetPassword);
