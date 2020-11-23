import { combineReducers } from "redux";

import film from "./film/film";
import user from "./user/user";

const rootReducer = combineReducers({
  user,
  film,
});

export default rootReducer;
