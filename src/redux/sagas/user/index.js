import { takeEvery, all, call, fork, put } from "redux-saga/effects";
import { get } from "lodash";
import { message } from "antd";
import UserActions, { UserActionTypes } from "../../actions/user/user";
import UserApi from "../api/user";


// GetList
function* handleGetList({ payload }) {
    try {
      const result = yield call(UserApi.User.getList, payload);
      const data = get(result, "data");
      if (get(result, "status") !== 200) {
        throw data;
      }
      yield put(UserActions.onGetListSuccess(data));
    } catch (error) {
      message.error("Get List User Error", error);
      yield put(UserActions.onGetListError(error));
    }
  }
  
  // GetDetail
  function* handleGetDetail({ id }) {
    try {
      const result = yield call(UserApi.User.getDetail, id);
      const data = get(result, "data");
      if (get(result, "status") !== 200) throw data;
      yield put(UserActions.onGetDetailSuccess(data));
    } catch (error) {
      message.error(get(error, "msg") || get(error, "message"));
      yield put(UserActions.onGetDetailError(error));
    }
  }

  // Create
  function* handleCreate({ payload ,callback}) {
    try {
      const result = yield call(UserApi.User.create, payload);
      const data = get(result, "data");
      if (get(result, "status") !== 201) throw data;
      message.success("Create User success!");
      if (callback) {
        callback();
      }
      yield put(UserActions.onCreateSuccess(data));
      yield put(UserActions.onGetList());
    } catch (error) {
      // console.log(error);
      message.error(get(error, "msg", "Error when create User! "+error));
      yield put(UserActions.onCreateError(error));
    }
  }
  
  // Update
  function* handleUpdate({ payload, callback }) {
    try {
      const result = yield call(UserApi.User.update, payload);
      console.log("result",result);
      const data = get(result, "data");
      if (get(result, "status") !== 200) throw data;
      message.success("Update User success!");
      if (callback){ callback();};
      yield put(UserActions.onUpdateSuccess(data));
      yield put(UserActions.onGetList());
    } catch (error) {
      // console.log(error);
      message.error(get(error, "msg", "Error when Update User " +error));
      yield put(UserActions.onUpdateError(error));
    }
  }
  
  // Delete
  function* handleDelete({ id,filters, callback }) {
    try {
      const result = yield call(UserApi.User.delete, id);
      const data = get(result, "data", {});
      if (get(result, "status") !== 200) throw data;
      message.success("Delete User Success!");
      if (callback) {callback();};
      yield put(UserActions.onDeleteSuccess(data));
      yield put(UserActions.onGetList());
    } catch (error) {
      console.log(error);
      message.error(error, "msq", "Error when Delete User!");
    }
  }
  
  export function* watchGetList() {
    yield takeEvery(UserActionTypes.GET_LIST, handleGetList);
  }
  export function* watchGetDetail() {
    yield takeEvery(UserActionTypes.GET_DETAIL, handleGetDetail);
  }
  export function* watchCreate() {
    yield takeEvery(UserActionTypes.CREATE, handleCreate);
  }
  export function* watchUpdate() {
    yield takeEvery(UserActionTypes.UPDATE, handleUpdate);
  }
  export function* watchDelete() {
    yield takeEvery(UserActionTypes.DELETE, handleDelete);
  }
  
  
  export default function* rootSaga() {
    yield all([
      fork(watchGetList),
      fork(watchGetDetail),
      fork(watchCreate),
      fork(watchUpdate),
      fork(watchDelete),
    ]);
  }