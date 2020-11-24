import { takeEvery, all, call, fork, put } from "redux-saga/effects";
import { get } from "lodash";
import { message } from "antd";
import FilmActions, { FilmActionTypes } from "../../actions/film/film";
import FilmApi from "../api/film";


// GetList
function* handleGetList({ payload }) {
    try {
      const result = yield call(FilmApi.Film.getList, payload);
      const data = get(result, "data");
      if (get(result, "status") !== 200) {
        throw data;
      }
      yield put(FilmActions.onGetListSuccess(data));
    } catch (error) {
      message.error("Get List Film Error", error);
      yield put(FilmActions.onGetListError(error));
    }
  }
  
  // GetDetail
  function* handleGetDetail({ id }) {
    try {
      const result = yield call(FilmApi.Film.getDetail, id);
      const data = get(result, "data");
      if (get(result, "status") !== 200) throw data;
      yield put(FilmActions.onGetDetailSuccess(data));
    } catch (error) {
      message.error(get(error, "msg") || get(error, "message"));
      yield put(FilmActions.onGetDetailError(error));
    }
  }

  // Create
  function* handleCreate({ payload ,callback}) {
    try {
      const result = yield call(FilmApi.Film.create, payload);
      const data = get(result, "data");
      if (get(result, "status") !== 201) throw data;
      message.success("Create Film success!");
      if (callback) {
        callback();
      }
      yield put(FilmActions.onCreateSuccess(data));
      yield put(FilmActions.onGetList());
    } catch (error) {
      console.log(error);
      message.error(get(error, "msg", "Error when create Film!"));
      yield put(FilmActions.onCreateError(error));
    }
  }
  
  // Update
  function* handleUpdate({ payload, callback }) {
    try {
      const result = yield call(FilmApi.Film.update, payload);
      console.log("result",result);
      const data = get(result, "data");
      if (get(result, "status") !== 200) throw data;
      message.success("Update Film success!");
      if (callback){ callback();};
      yield put(FilmActions.onUpdateSuccess(data));
      yield put(FilmActions.onGetList());
    } catch (error) {
      console.log(error);
      message.error(get(error, "msg", "Error when Update Film"));
      yield put(FilmActions.onUpdateError(error));
    }
  }
  
  // Delete
  function* handleDelete({ id,filters, callback }) {
    try {
      const result = yield call(FilmApi.Film.delete, id);
      const data = get(result, "data", {});
      if (get(result, "status") !== 200) throw data;
      message.success("Delete Film Success!");
      if (callback) {callback();};
      yield put(FilmActions.onDeleteSuccess(data));
      yield put(FilmActions.onGetList());
    } catch (error) {
      console.log(error);
      message.error(error, "msq", "Error when Delete Film!");
    }
  }
  
  export function* watchGetList() {
    yield takeEvery(FilmActionTypes.GET_LIST, handleGetList);
  }
  export function* watchGetDetail() {
    yield takeEvery(FilmActionTypes.GET_DETAIL, handleGetDetail);
  }
  export function* watchCreate() {
    yield takeEvery(FilmActionTypes.CREATE, handleCreate);
  }
  export function* watchUpdate() {
    yield takeEvery(FilmActionTypes.UPDATE, handleUpdate);
  }
  export function* watchDelete() {
    yield takeEvery(FilmActionTypes.DELETE, handleDelete);
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