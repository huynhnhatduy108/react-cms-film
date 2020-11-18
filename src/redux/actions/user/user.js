export const UserActionTypes = {
    GET_LIST: "GET_LIST",
    GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
    GET_LIST_ERROR: "GET_LIST_ERROR",
  
    GET_DETAIL: "GET_DETAIL",
    GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
    GET_DETAIL_ERROR: "GET_DETAIL_ERROR",
  
    CREATE: "CREATE",
    CREATE_SUCCESS: "CREATE_SUCCESS",
    CREATE_ERROR: "CREATE_ERROR",
  
    UPDATE: "UPDATE",
    UPDATE_SUCCESS: "UPDATE_SUCCESS",
    UPDATE_ERROR: "UPDATE_ERROR",
  
    DELETE: "DELETE",
    DELETE_SUCCESS: "DELETE_SUCCESS",
    DELETE_ERROR: "DELETE_ERROR",
  
    CLEAR_DETAIL: "CLEAR_DETAIL",
    CLEAR_STATE: "CLEAR_STATE",

  };
  Object.keys(UserActionTypes).forEach((key) => {
    UserActionTypes[key] = `USER_${UserActionTypes[key]}`;
  });
  
  const onClearDetail = () => ({
    type: UserActionTypes.CLEAR_DETAIL,
  });
  
  const onClearState = () => ({
    type: UserActionTypes.CLEAR_STATE,
  });
  
  // ON GET LIST
  const onGetList = (payload) => ({
    type: UserActionTypes.GET_LIST,
    payload
  });
  
  const onGetListSuccess = (payload) => ({
    type: UserActionTypes.GET_LIST_SUCCESS,
    payload,
  });
  
  const onGetListError = (error) => ({
    type: UserActionTypes.GET_LIST_ERROR,
    payload: error
  });
  
  // ON LIST 
  const onGetDetail = (id) => ({
    type: UserActionTypes.GET_DETAIL,
    id,
  });
  
  const onGetDetailSuccess = (payload) => ({
    type: UserActionTypes.GET_DETAIL_SUCCESS,
    payload
  });
  
  const onGetDetailError = (error) => ({
    type: UserActionTypes.GET_DETAIL_ERROR,
    payload: error,
  });
  
  // ON CREAT 
  const onCreate = ({ params, filters, callback }) => ({
    type: UserActionTypes.CREATE,
    payload: { params },
    filters,
    callback,
  });
  
  const onCreateSuccess = (payload) => ({
    type: UserActionTypes.CREATE_SUCCESS,
    payload,
  });
  
  const onCreateError = (error) => ({
    type: UserActionTypes.CREATE_ERROR,
    payload: error,
  });
  
  // ON UPDATE
  const onUpdate = ({id, params, filters, callback}) => ({
      type: UserActionTypes.UPDATE,
      payload : {id,params},
      filters,
      callback,
  });
  
  const onUpdateSuccess = (payload) => ({
    type: UserActionTypes.UPDATE_SUCCESS,
    payload
  });
  
  const onUpdateError = (error) => ({
    type: UserActionTypes.UPDATE_ERROR,
    payload: error,
  });
  
  // ON DELETE
  const onDelete = ({id, filters,callback}) =>({
    type: UserActionTypes.DELETE,
   id,
   filters,
   callback,
  });
  
  const onDeleteSuccess = (payload) => ({
    type: UserActionTypes.DELETE_SUCCESS,
    payload,
  });
  
  const onDeleteError = (error) => ({
    type: UserActionTypes.DELETE_ERROR,
    payload: error,
  });
  
  const UserAction = {
    onClearDetail,
  
    onClearState,
  
    onGetList,
    onGetListSuccess,
    onGetListError,
  
    onGetDetail,
    onGetDetailSuccess,
    onGetDetailError,
  
    onCreate,
    onCreateSuccess,
    onCreateError,
  
    onUpdate,
    onUpdateSuccess,
    onUpdateError,
  
    onDelete,
    onDeleteSuccess,
    onDeleteError,
  
  };
  export default UserAction;
  