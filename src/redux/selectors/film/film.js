import { createSelector } from "reselect";
import { get } from "lodash";

const getState = (state) => get(state, "film");

const getList = createSelector(getState, (state) => get(state, "listFilm", []));


const getMetadata = createSelector(getState, (state) =>
  get(state, "metadata", {})
);

const apiResultGetList = createSelector(getState, (state) =>
  get(state, "apiResultGetList", {})
);

const getDetail = createSelector(getState, (state) => get(state, "detail", {}));

const FaqSelectors = {
  getState: createSelector(getState, (state) => state),
  getList,
  getMetadata,
  apiResultGetList,
  getDetail,
};

export default FaqSelectors;
