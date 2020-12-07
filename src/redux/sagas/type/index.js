import { all } from "redux-saga/effects";
import Type from "./type";

export default function* rootSaga() {
  yield all([
    Type(),
  ]);
}