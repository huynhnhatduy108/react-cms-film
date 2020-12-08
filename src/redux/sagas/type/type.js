import { takeEvery, all, call, fork, put } from "redux-saga/effects";
import { get } from "lodash";
import { message } from "antd";
import TypeFilmActions, { TypeFilmActionTypes } from "../../actions/type/typefilm";
import TypeApi from "../api/type";

// GetList
function* handleGetList({ payload }) {
    try {
      const result = yield call(TypeApi.Type.getList, payload);
      const data = get(result, "data");
      if (get(result, "status") !== 200) {
        throw data;
      }
      yield put(TypeFilmActions.onGetListSuccess(data));
    } catch (error) {
      message.error("Get List Type Film Error", error);
      yield put(TypeFilmActions.onGetListError(error));
    }
  }
  
  // GetDetail
  function* handleGetDetail({ id }) {
    try {
      const result = yield call(TypeApi.Type.getDetail, id);
      const data = get(result, "data");
      if (get(result, "status") !== 200) throw data;
      yield put(TypeFilmActions.onGetDetailSuccess(data));
    } catch (error) {
      message.error(get(error, "msg") || get(error, "message"));
      yield put(TypeFilmActions.onGetDetailError(error));
    }
  }

  // Create
  function* handleCreate({ payload }) {
    try {
      const result = yield call(TypeApi.Type.create, payload);
      const data = get(result, "data");
      if (get(result, "status") !== 201) throw data;
      message.success("Create Type Film success!")
      yield put(TypeFilmActions.onCreateSuccess(data));
      yield put(TypeFilmActions.onGetList());
    } catch (error) {
      console.log(error);
      message.error(get(error, "msg", "Error when create Type Film!"+ error));
      yield put(TypeFilmActions.onCreateError(error));
    }
  }
  
  // Update
  function* handleUpdate({ payload, callback }) {
    try {
      const result = yield call(TypeApi.Type.update, payload);
      console.log("result",result);
      const data = get(result, "data");
      if (get(result, "status") !== 200) throw data;
      message.success("Update Type Film success!");
      if (callback){ callback();};
      yield put(TypeFilmActions.onUpdateSuccess(data));
      yield put(TypeFilmActions.onGetList());
    } catch (error) {
      console.log(error);
      message.error(get(error, "msg", "Error when Update Type Film"));
      yield put(TypeFilmActions.onUpdateError(error));
    }
  }
  
  // Delete
  function* handleDelete({ id,filters, callback }) {
    try {
      const result = yield call(TypeApi.Type.delete, id);
      const data = get(result, "data", {});
      if (get(result, "status") !== 200) throw data;
      message.success("Delete Type Film Success!");
      if (callback) {callback();};
      yield put(TypeFilmActions.onDeleteSuccess(data));
      yield put(TypeFilmActions.onGetList());
    } catch (error) {
      console.log(error);
      message.error(error, "msq", "Error when Delete Type Film!");
    }
  }


//  Forgein to Film



  
  export function* watchGetList() {
    yield takeEvery(TypeFilmActionTypes.GET_LIST, handleGetList);
  }
  export function* watchGetDetail() {
    yield takeEvery(TypeFilmActionTypes.GET_DETAIL, handleGetDetail);
  }
  export function* watchCreate() {
    yield takeEvery(TypeFilmActionTypes.CREATE, handleCreate);
  }
  export function* watchUpdate() {
    yield takeEvery(TypeFilmActionTypes.UPDATE, handleUpdate);
  }
  export function* watchDelete() {
    yield takeEvery(TypeFilmActionTypes.DELETE, handleDelete);
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