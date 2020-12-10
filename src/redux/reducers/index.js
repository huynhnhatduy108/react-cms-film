import { combineReducers } from "redux";

import film from "./film/film";
import user from "./user/user";
import typefilm from "./type/typefilm";
import auth from "./auth/auth";


const rootReducer = combineReducers({
  user,
  film,
  typefilm,
  auth,
});

export default rootReducer;
