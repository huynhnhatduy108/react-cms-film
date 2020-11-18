import { all } from "redux-saga/effects";

import Film from "./film";

export default function* rootSaga() {
  yield all([
    Film(),
  ]);
}
