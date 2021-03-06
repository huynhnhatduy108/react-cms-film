import { get, omit, cloneDeep } from "lodash";
import { UserActionTypes } from "../../actions/user/user";

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
    case UserActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case UserActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case UserActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        apiResultGetList: omit(get(action, "payload"), ["data"]),
      };

    case UserActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        listUser: get(action, "payload", []),
        apiResultGetList: omit(get(action, "payload"), ["data"]),
      };

    case UserActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case UserActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case UserActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case UserActionTypes.CREATE:
    case UserActionTypes.UPDATE:
    case UserActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case UserActionTypes.CREATE_ERROR:
    case UserActionTypes.UPDATE_ERROR:
    case UserActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case UserActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    case UserActionTypes.CREATE_SUCCESS:
    case UserActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    default:
      return state;
  }
}
