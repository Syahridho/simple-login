import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { logoutUserAPI, checkIsLogin } from "../../config/redux/action/action";

class Dashboard extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = ({
  //     isLogin
  //   })
  // }

  componentDidMount() {
    const userLocal = JSON.parse(localStorage.getItem("userData"));
    console.log(userLocal);
    const { checkInLogin } = this.props;

    checkInLogin(userLocal);
  }

  handleLoguot = () => {
    const { logout } = this.props;

    logout();
  };

  render() {
    return (
      <div className="">
        <div className="flex justify-between items-center p-4">
          <h1>Dashboard</h1>
          {this.props.isLogin === true ? (
            <button
              onClick={this.handleLoguot}
              className="border border-red-400 py-1 px-2 text-red-400 rounded-sm"
            >
              logout
            </button>
          ) : (
            <div>
              <NavLink
                to={"/login"}
                className="border border-slate-800 py-1 px-2 rounded-sm mx-1"
              >
                Sign In
              </NavLink>
              <NavLink
                to={"/register"}
                className="py-1 px-2 border border-slate-800 bg-slate-800 text-white rounded-sm mx-1"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
        <div className="flex justify-center py-10">
          <p className="font-medium">{this.props.user.email}</p>
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  user: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  loguot: () => dispatch(logoutUserAPI()),
  checkIsLogin: (data) => dispatch(checkIsLogin(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);