import { get, omit, cloneDeep } from "lodash";
import { FilmActionTypes } from "../../actions/film/film";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

// function handleUpdate({state, action}) {
//   const list = cloneDeep(state.list);
//   const detailData = get(action, "payload.data");
//   const index = list.findIndex(i => i.id === detailData.id);
//   console.log("index", index);
//   if (index !== -1) {
//     list[index] = {...list[index], ...detailData};
//   }
//   return {
//     ...state,
//     processing: false,
//     list,
//     detail: {
//       ...state.detail,
//       data: { ...state.detail.data, ...detailData },
//     },
//   };
// }

export default function (state = init, action) {
  switch (action.type) {
    case FilmActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case FilmActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case FilmActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case FilmActionTypes.GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        apiResultGetList: omit(get(action, "payload"), ["data"]),
      };

    case FilmActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        listFilm: get(action, "payload.data.data", []),
        metadata: omit(get(action, "payload.data"), ["data"]),
        apiResultGetList: omit(get(action, "payload"), ["data"]),
      };

    case FilmActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case FilmActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case FilmActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case FilmActionTypes.CREATE:
    case FilmActionTypes.UPDATE:
    case FilmActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case FilmActionTypes.CREATE_ERROR:
    case FilmActionTypes.UPDATE_ERROR:
    case FilmActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case FilmActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    case FilmActionTypes.CREATE_SUCCESS:
    case FilmActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    default:
      return state;
  }
}
