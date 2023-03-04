export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};
// redux-thunk
// export const loginAction=(data)=>{
//   return (dispatch, getState)=>{
//     const state=getState()
//     dispatch(loginRequestAction());
//     axios.post(`/api/login`)
//     .then((res)=>{
//       dispatch(loginSuccessAction(res.data));
//     })
//     .catch((err)=>{
//       dispatch(loginFailureAction(err))
//     })
//   }
// }

export const loginRequestAction = (data) => {
  return {
    type: "LOGIN_REQUEST",
    data,
  };
};

export const loginSuccessAction = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    data,
  };
};

export const loginFailureAction = (data) => {
  return {
    type: "LOGIN_FAILURE",
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: "LOGOUT_REQUEST",
  };
};

export const logoutSuccessAction = (data) => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};

export const logoutFailureAction = (data) => {
  return {
    type: "LOGOUT_FAILURE",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };

    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};
export default reducer;
