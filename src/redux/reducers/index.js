import { combineReducers } from "redux";

import film from "./film/film";
import user from "./user/user";
import typefilm from "./type/typefilm";


const rootReducer = combineReducers({
  user,
  film,
  typefilm,
});

export default rootReducer;
