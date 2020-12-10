import { takeEvery, all, call, fork, put } from "redux-saga/effects";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { get } from "lodash";
import { message } from "antd";
import AuthActions, { AuthActionTypes } from "../../actions/auth/auth";
import UserApi from "../api/user";


function* handleLRegister({payload}) {
    try {
        const result = yield call(UserApi.Auth.register, payload);
        const data = get(result, "data");
        if (get(result, "status") !== 201) throw data;
        message.success("Register User success!");
        yield put(AuthActions.onRegisterSuccess(data));
      } catch (error) {
        message.error(get(error, "msg", "Error when Register User! "+ error));
        yield put(AuthActions.onRegisterError(error));
      }
}

function* handlelogin({payload}) {
    try {
        const result = yield call(UserApi.Auth.login, payload);
        const data = get(result, "data");
        if (get(result, "status") !== 200) {
          throw data;
        }
        message.success("Login User success!");
        yield put(AuthActions.onLoginSuccess(data));
      } catch (error) {
        message.error(get(error, "msg", "Error when Login User! "+ error));
        yield put(AuthActions.onLoginError(error));
      }

}

function* handleLogout(payload) {
    try {
        const result = yield call(UserApi.Auth.logout, payload);
        const data = get(result, "data");
        if (get(result, "status") !== 200) {
          throw data;
        }
        yield put(AuthActions.onLogoutSuccess(data));
      } catch (error) {
        message.error(get(error, "msg", "Logout Error "+ error));
        yield put(AuthActions.onLogoutError(error));
      }
}

export function* watchRegister() {
    yield takeEvery(AuthActionTypes.REGISTER, handleLRegister);
  }

export function* watchLogin() {
  yield takeEvery(AuthActionTypes.LOGIN, handlelogin);
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT, handleLogout);
}

export default function* rootSaga() {
    yield all([
      fork(watchRegister),
      fork(watchLogin),
      fork(watchLogout),
    ]);
  }


  
