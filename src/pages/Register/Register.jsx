import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUserAPI } from "../../config/redux/action/action";

import Button from "../../components/Button";
import PopUpRegister from "../../components/PopUpRegister";
import { useState } from "react";

const Register = ({ isLoading, registerAPI }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [allReady, setAllReady] = useState(false);
  const [maxPassword, setMaxPassword] = useState(false);
  const [popUpSucces, setPopUpSucces] = useState(false);

  const onInputChange = (e, type) => {
    setForm((prevDatas) => ({
      ...prevDatas,
      [type]: e.target.value,
    }));
    console.log(form);
  };

  const onSubmitHandle = async () => {
    const res = await registerAPI({
      email: form.email,
      password: form.password,
    }).catch((err) => err);
    console.log("res", res);
    if (res === true) {
      setForm({
        email: "",
        password: "",
      });
      setAllReady(false);
      setMaxPassword(false);
      setPopUpSucces(true);
    } else if (res == "auth/email-already-in-use") {
      setAllReady(true);
      setMaxPassword(false);
    } else if (res == "auth/weak-password") {
      setAllReady(false);
      setMaxPassword(true);
    }
  };
  return (
    <div className="container mx-auto p-10 md:py-10">
      <div className="grid md:grid-cols-5 xl:grid-cols-6 gap-4">
        <div className="md:col-span-3 md:col-start-2 xl:col-span-2 xl:col-start-3">
          <h1 className="text-center font-bold text-2xl ">Register</h1>
          <div className="flex flex-col my-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="border p-1 mb-4"
              placeholder="Email"
              value={form.email}
              onChange={(e) => onInputChange(e, "email")}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="border p-1 mb-4"
              placeholder="Password"
              value={form.password}
              onChange={(e) => onInputChange(e, "password")}
              required
            />
            {maxPassword ? (
              <p className="text-sm text-red-500">
                Password harus lebih dari 6*
              </p>
            ) : null}
            {allReady ? (
              <p className="text-sm text-red-500">Email Sudah dipakai*</p>
            ) : null}
            <Button
              title={"Buat Akun"}
              loading={isLoading}
              onClick={onSubmitHandle}
            />
          </div>
          <hr className="my-10" />
          <p className="text-center">Sudah punya akun?</p>
          <NavLink
            to={"/login"}
            className="underline block text-center text-blue-900"
          >
            Login disini
          </NavLink>
          {popUpSucces ? (
            <PopUpRegister
              title={"Akun berhasil dibuat"}
              onClick={() => setPopUpSucces(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
