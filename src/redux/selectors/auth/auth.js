import { createSelector } from "reselect";
import { get } from "lodash";

const getState = (state) => get(state, "auth");

const getUser = createSelector(getState, (state) => get(state, "user", {}));

const apiResult = createSelector(getState, (state) =>
  get(state, "apiResult", {})
);

const FaqSelectors = {
    getState: createSelector(getState, (state) => state),
    getUser,
    apiResult,
  };
  
  export default FaqSelectors;
  