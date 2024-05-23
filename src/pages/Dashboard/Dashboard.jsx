import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { checkLogin, logoutUserAPI } from "../../config/redux/action/action";

const Dashboard = ({ logout, isLogin, user, checkLogin }) => {
  const [isLogout, setisLogout] = useState(false);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("userData"));

    checkLogin(userLocal);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      setisLogout(true);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  if (isLogout) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="mx-auto container">
      <div className="flex justify-between items-center py-6 px-10  md:px-20">
        <h1>Dashboard</h1>
        {isLogin ? (
          <button
            onClick={handleLogout}
            className="border border-red-400 py-1 px-2 text-red-400 rounded-sm "
          >
            logout
          </button>
        ) : (
          <div>
            <NavLink
              to={"/login"}
              className="border border-slate-800 py-1 px-3 rounded-sm mx-1 shadow transition duration-300 hover:bg-slate-800 hover:text-white"
            >
              Sign In
            </NavLink>
            <NavLink
              to={"/register"}
              className="py-1 px-2 border border-slate-800 bg-slate-800 text-white rounded-sm mx-1 shadow transition duration-300 hover:bg-white hover:text-slate-800"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
      {isLogin ? (
        <div className="flex justify-center py-10">
          <p className="font-medium">{user.email}</p>
        </div>
      ) : null}
    </div>
  );
};

const reduxState = (state) => ({
  user: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  logout: () => dispatch(logoutUserAPI()),
  checkLogin: (user) => dispatch(checkLogin(user)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
