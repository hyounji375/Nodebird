import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

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
      type: "LOGIN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOGIN_FAILURE",
      data: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post("/api/logout");
}

function* logout() {
  try {
    // const result = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: "LOGOUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOGOUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOGIN_REQUEST", login);
  //   LOGIN이라는 액션이 실행될 때까지 기다리겠다.
  // LOGIN이라는 액션이 실행되면 login을 실행한다.
}

function* watchLogout() {
  yield takeLatest("LOGOUT_REQUEST", logout);
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
