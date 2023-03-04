export const initialState = {
  isLoggingIn: false, //로그인 시도 중(true면 로딩창 띄우는 용도)
  isLoggedIn: false,
  isLoggingOut: false, //로그아웃 시도 중
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

export const logoutRequestAction = (data) => {
  return {
    type: "LOGOUT_REQUEST",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoggingIn: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "editha" },
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };

    case "LOGOUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case "LOGOUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};
export default reducer;
