import { all } from "redux-saga/effects";
import film from "./film";
import type from "./type";
import user from "./user";
import auth from "./auth";

export default function* rootSaga(getState) {
    yield all([
        film(), 
        type(),
        user(), 
        auth(),
    ]);
  }