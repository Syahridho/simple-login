import { Component } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import autoBindReact from "auto-bind/react";
import { loginUserAPI } from "../../config/redux/action/action";
import Button from "../../components/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      login: false,
      check: false,
    };
    autoBindReact(this);
  }

  onInputChange = (e, type) => {
    this.setState((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  onSubmitHandle = async () => {
    const { email, password } = this.state;
    const { isLogin } = this.props;

    this.setState(() => {
      return {
        ...this.state,
        check: false,
      };
    });

    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);

    if (res === true) {
      localStorage.setItem("userData", JSON.stringify(this.props.user));
      this.setState(() => {
        return {
          email: "",
          password: "",
          login: true,
        };
      });
    } else if (res === "auth/invalid-email") {
      this.setState(() => {
        return {
          ...this.state,
          check: true,
        };
      });
    } else {
      this.setState(() => {
        return {
          ...this.state,
          check: true,
        };
      });
    }
  };

  render() {
    const { email, password, login, check } = this.state;

    if (login === true) {
      return <Navigate to={"/"} />;
    }

    return (
      <div className="container mx-auto p-10 md:px-32 lg:px-56 xl:px-96">
        <h1 className="text-center font-bold text-2xl ">Login</h1>
        <div className="flex flex-col my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-1 mb-4 "
            value={email}
            onChange={(e) => this.onInputChange(e, "email")}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-1 "
            value={password}
            onChange={(e) => this.onInputChange(e, "password")}
            required
          />
          <div className="text-right mb-4">
            <NavLink
              className="inline underline italic text-sm"
              to={"/reset-password"}
            >
              Lupa Password
            </NavLink>
          </div>
          {check === true ? (
            <p className="text-sm text-red-500">Email atau password salah</p>
          ) : null}
          <Button
            title={"Login"}
            onClick={this.onSubmitHandle}
            loading={this.props.isLoading}
          />
        </div>
        <hr className="my-10" />
        <p className="text-center">
          Belum punya akun? <br />{" "}
          <NavLink to={"/register"} className="underline text-blue-900">
            daftar disini
          </NavLink>
        </p>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
  user: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
