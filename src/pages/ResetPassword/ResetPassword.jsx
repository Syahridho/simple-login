import { useState } from "react";
import { resetPassword } from "../../config/redux/action/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const ResetPassword = ({ resetPass, isLoading }) => {
  const [email, setEmail] = useState("");
  const [emailSucces, setEmailSucces] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const onChangeInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    setEmailSucces(false);
    setEmailFail(false);
    const res = await resetPass(email).catch((error) => error);
    if (res === true) {
      setEmailSucces(true);
      setEmailFail(false);
      setEmailValid(false);
      setEmail("");
    } else if (res === "auth/too-many-requests") {
      setEmailSucces(false);
      setEmailFail(true);
      setEmailValid(false);
    } else if (res === "auth/invalid-email") {
      setEmailValid(true);
      setEmailSucces(false);
      setEmailFail(false);
    }
  };

  return (
    <div className="container mx-auto p-10">
      <div className="grid md:grid-cols-5 xl:grid-cols-6 gap-4">
        <div className="md:col-span-3 md:col-start-2 xl:col-span-2 xl:col-start-3">
          <h1 className="font-medium text-2xl text-center mb-8">
            Reset Password
          </h1>
          {emailFail ? (
            <div className="bg-red-200 text-red-600 font-medium px-3 py-2 my-2 rounded border border-red-500 flex justify-between">
              <p>Terlalu banyak percobaan</p>
              <button onClick={() => setEmailFail(false)}>x</button>
            </div>
          ) : null}

          {emailSucces ? (
            <div className="bg-blue-200 text-blue-600 font-medium px-3 py-2 my-2 rounded border border-blue-500 flex justify-between">
              <p>Silahkan cek email anda</p>
              <button onClick={() => setEmailSucces(false)}>x</button>
            </div>
          ) : null}

          <div className=" mb-4">
            <label htmlFor="email" className="my-2 block">
              Masukkan Email
            </label>
            {emailValid ? (
              <p className="text-sm text-red-500">Email tidak valid</p>
            ) : null}
            <input
              type="email"
              name="email"
              className="border w-full px-2 py-1"
              value={email}
              onChange={(e) => onChangeInput(e)}
            />
          </div>
          <Button
            title={"Reset Password"}
            onClick={handleSubmit}
            loading={isLoading}
          />
          <hr className="my-10" />
          <p className="text-center">
            sudah selesai? silahkan login <br />
            <Link to={"/login"} className="underline text-blue-900">
              Login
            </Link>
          </p>
        </div>
      </div>
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
