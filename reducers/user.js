export const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,

  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  signupLoading: false,
  signupDone: false,
  signupError: null,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  me: null,
  signupData: {},
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

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = (data) => ({
  ...data,
  nickname: "editha",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "Mango" },
    { nickname: "Apple" },
    { nickname: "Banana" },
  ],
  Followers: [
    { nickname: "Orange" },
    { nickname: "Strawberry" },
    { nickname: "Grape" },
  ],
});

export const loginRequestAction = (data) => {
  return {
    type: LOGIN_REQUEST,
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        me: dummyUser(action.data),
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutDone: true,
        me: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      };

    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };

    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
