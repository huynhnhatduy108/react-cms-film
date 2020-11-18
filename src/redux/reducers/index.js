import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import film from "./film";
import user from "./user";


const createAppReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    film,
    user,
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === "LOGOUT") {
    return {
      router: state.router,
    };
  }
  return createAppReducer(history)(state, action);
};

export default createRootReducer;
