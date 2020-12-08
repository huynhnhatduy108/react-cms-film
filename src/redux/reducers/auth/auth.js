import { get, omit } from "lodash";
import { AuthActionTypes } from "../../actions/auth/auth";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function (state = init, action) {
  switch (action.type) {
    case AuthActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case AuthActionTypes.LOGIN:
      return {
        ...state,
        loading: true,
      };

    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        apiResult: omit(get(action, "payload"), ["data"]),
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: get(action, "payload", []),
        apiResult: omit(get(action, "payload"), ["data"]),
      };

      case AuthActionTypes.LOGOUT:
        return {
          ...state,
          loading: true,
        };
  
      case AuthActionTypes.LOGOUT_ERROR:
        return {
          ...state,
          loading: false,
          apiResult: omit(get(action, "payload"), ["data"]),
        };
  
      case AuthActionTypes.LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          user: null,
          apiResult: omit(get(action, "payload"), ["data"]),
        };

        case AuthActionTypes.REGISTER:
        return {
          ...state,
          loading: true,
        };
  
      case AuthActionTypes.REGISTER_ERROR:
        return {
          ...state,
          loading: false,
        };
  
      case AuthActionTypes.REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
}
