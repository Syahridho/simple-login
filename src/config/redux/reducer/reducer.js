const initialState = {
  isLoading: false,
  isLogin: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  if (action.type === "CHANGE_ISLOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  if (action.type === "CHANGE_ISLOGIN") {
    return {
      ...state,
      isLogin: action.value,
    };
  }
  if (action.type === "CHANGE_USER") {
    return {
      ...state,
      user: action.value,
    };
  }

  return state;
};

export default reducer;
