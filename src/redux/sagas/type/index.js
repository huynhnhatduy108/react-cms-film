import { all } from "redux-saga/effects";
import Type from "./film";

export default function* rootSaga() {
  yield all([
    Type(),
  ]);
}