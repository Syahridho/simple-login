import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginUserAPI } from "../../config/redux/action/action";
import Button from "../../components/Button";

const Login = ({ isLoading, loginAPI }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [login, setLogin] = useState(false);
  const [check, setCheck] = useState(false);

  const onInputChange = (e, type) => {
    setForm((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const onSubmitHandle = async () => {
    const res = await loginAPI({
      email: form.email,
      password: form.password,
    }).catch((err) => err);

    if (res) {
      setForm({
        email: "",
        password: "",
      });
      setLogin(true);
    } else if (res === "auth/invalid-email") {
      setForm({
        email: "",
        password: "",
      });
      setCheck(true);
    } else {
      setForm({
        email: "",
        password: "",
      });
      setCheck(true);
    }
  };

  if (login) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="grid md:grid-cols-5 xl:grid-cols-6 gap-4">
        <div className="md:col-span-3 md:col-start-2 xl:col-span-2 xl:col-start-3">
          <h1 className="text-center font-bold text-2xl">Login</h1>
          <div className="flex flex-col my-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-1 mb-4 "
              value={form.email}
              onChange={(e) => onInputChange(e, "email")}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-1 "
              value={form.password}
              onChange={(e) => onInputChange(e, "password")}
              required
            />
            <div className="text-right mb-4">
              <Link
                className="inline underline italic text-sm"
                to={"/reset-password"}
              >
                Lupa Password
              </Link>
            </div>
            {check ? (
              <p className="text-sm text-red-500">Email atau password salah</p>
            ) : null}
            <Button
              title={"Login"}
              onClick={onSubmitHandle}
              loading={isLoading}
            />
          </div>
          <hr className="my-10" />
          <p className="text-center">
            Belum punya akun? <br />
            <Link to={"/register"} className="underline text-blue-900">
              daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const reduxState = (state) => ({
  isLoading: state.isLoading,
  user: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
