import { all, fork, put, delay, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../reducers/user";

function loginAPI(data) {
  return axios.post("/api/login", data);
  //   서버에 요청 보내기
}

function* login(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    //  서버에 요청을 보낸 결과를 받음
    // put은 dispatch라고 생각하면 됨
    // call을 하면 loginAPI가 return할 때까지 기다려서 값을 result에 넣어줌.
    // action.data가 loginAPI에 매개변수로 들어감
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post("/api/logout");
}

function* logout(action) {
  try {
    // const result = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: LOGOUT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signupAPI() {
  return axios.post("/api/signup");
}

function* signup(action) {
  try {
    // const result = yield call(signupAPI);
    yield delay(1000);
    yield put({
      type: SIGNUP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
  //   LOGIN이라는 액션이 실행될 때까지 기다리겠다.
  // LOGIN이라는 액션이 실행되면 login을 실행한다.
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup)]);
}
