import { all } from "redux-saga/effects";

import User from "./user";

export default function* rootSaga() {
  yield all([
    User(),
  ]);
}
