export const TypeFilmActionTypes = {
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
  Object.keys(TypeFilmActionTypes).forEach((key) => {
    TypeFilmActionTypes[key] = `TYPE_FILM_${TypeFilmActionTypes[key]}`;
  });
  
  const onClearDetail = () => ({
    type: TypeFilmActionTypes.CLEAR_DETAIL,
  });
  
  const onClearState = () => ({
    type: TypeFilmActionTypes.CLEAR_STATE,
  });
  
  // ON GET LIST
  const onGetList = (payload) => ({
    type: TypeFilmActionTypes.GET_LIST,
    payload
  });
  
  const onGetListSuccess = (payload) => ({
    type: TypeFilmActionTypes.GET_LIST_SUCCESS,
    payload,
  });
  
  const onGetListError = (error) => ({
    type: TypeFilmActionTypes.GET_LIST_ERROR,
    payload: error
  });
  
  // ON LIST 
  const onGetDetail = (id) => ({
    type: TypeFilmActionTypes.GET_DETAIL,
    id,
  });
  
  const onGetDetailSuccess = (payload) => ({
    type: TypeFilmActionTypes.GET_DETAIL_SUCCESS,
    payload
  });
  
  const onGetDetailError = (error) => ({
    type: TypeFilmActionTypes.GET_DETAIL_ERROR,
    payload: error,
  });
  
  // ON CREAT 
  const onCreate = ({ params, filters, callback }) => ({
    type: TypeFilmActionTypes.CREATE,
    payload: { params },
    filters,
    callback,
  });
  
  const onCreateSuccess = (payload) => ({
    type: TypeFilmActionTypes.CREATE_SUCCESS,
    payload,
  });
  
  const onCreateError = (error) => ({
    type: TypeFilmActionTypes.CREATE_ERROR,
    payload: error,
  });
  
  // ON UPDATE
  const onUpdate = ({id, params, filters, callback}) => ({
      type: TypeFilmActionTypes.UPDATE,
      payload : {id,params},
      filters,
      callback,
  });
  
  const onUpdateSuccess = (payload) => ({
    type: TypeFilmActionTypes.UPDATE_SUCCESS,
    payload
  });
  
  const onUpdateError = (error) => ({
    type: TypeFilmActionTypes.UPDATE_ERROR,
    payload: error,
  });
  
  // ON DELETE
  const onDelete = ({id, filters,callback}) =>({
    type: TypeFilmActionTypes.DELETE,
   id,
   filters,
   callback,
  });
  
  const onDeleteSuccess = (payload) => ({
    type: TypeFilmActionTypes.DELETE_SUCCESS,
    payload,
  });
  
  const onDeleteError = (error) => ({
    type: TypeFilmActionTypes.DELETE_ERROR,
    payload: error,
  });
  
  const TypeFilmAction = {
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
  export default TypeFilmAction;
  