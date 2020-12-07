import { get, omit, cloneDeep } from "lodash";
import { TypeFilmActionTypes } from "../../actions/type/typefilm";

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
    case TypeFilmActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case TypeFilmActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case TypeFilmActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case TypeFilmActionTypes.GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        apiResultGetList: omit(get(action, "payload"), ["data"]),
      };

    case TypeFilmActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        listTypeFilm: get(action, "payload", []),
        apiResultGetList: omit(get(action, "payload"), ["data"]),
      };

    case TypeFilmActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case TypeFilmActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case TypeFilmActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case TypeFilmActionTypes.CREATE:
    case TypeFilmActionTypes.UPDATE:
    case TypeFilmActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case TypeFilmActionTypes.CREATE_ERROR:
    case TypeFilmActionTypes.UPDATE_ERROR:
    case TypeFilmActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case TypeFilmActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    case TypeFilmActionTypes.CREATE_SUCCESS:
    case TypeFilmActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    default:
      return state;
  }
}
