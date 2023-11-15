import { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUserAPI } from "../../config/redux/action/action";
import autoBindReact from "auto-bind/react";

import Button from "../../components/Button";
import PopUpRegister from "../../components/PopUpRegister";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      allReady: false,
      maxPassword: false,
      popUpSucces: false,
    };
    autoBindReact(this);
  }

  onInputChange = (e, type) => {
    this.setState((prevDatas) => ({
      ...prevDatas,
      [type]: e.target.value,
    }));
    console.log(this.state);
  };

  onSubmitHandle = async () => {
    const { email, password } = this.state;

    const res = await this.props
      .registerAPI({ email, password })
      .catch((err) => err);

    if (res) {
      this.setState(() => ({
        email: "",
        password: "",
        allReady: false,
        maxPassword: false,
        popUpSucces: true,
      }));
    } else if (password.length < 6) {
      this.setState(() => ({
        ...this.state,
        maxPassword: true,
      }));
    } else {
      this.setState(() => ({
        ...this.state,
        allReady: true,
      }));
    }
  };
  render() {
    const { email, password, allReady, maxPassword, popUpSucces } = this.state;
    return (
      <div className="container mx-auto p-10 md:px-32 lg:px-56 xl:px-96">
        <h1 className="text-center font-bold text-2xl ">Register</h1>
        <div className="flex flex-col my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="border p-1 mb-4"
            placeholder="Email"
            value={email}
            onChange={(e) => this.onInputChange(e, "email")}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="border p-1 mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => this.onInputChange(e, "password")}
            required
          />
          {maxPassword === true && password.length < 6 ? (
            <p className="text-sm text-red-500">Password harus lebih dari 6*</p>
          ) : null}
          {allReady === true ? (
            <p className="text-sm text-red-500">Email Sudah dipakai*</p>
          ) : null}
          <Button
            title={"Buat Akun"}
            loading={this.props.isLoading}
            onClick={this.onSubmitHandle}
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
        {popUpSucces === true ? (
          <PopUpRegister
            title={"Akun berhasil dibuat"}
            onClick={() => this.setState({ ...this.state, popUpSucces: false })}
          />
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
