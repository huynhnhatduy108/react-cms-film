import { all } from "redux-saga/effects";
import film from "./film";


export default function* rootSaga(getState) {
    yield all([
        film(),
        
    ]);
  }