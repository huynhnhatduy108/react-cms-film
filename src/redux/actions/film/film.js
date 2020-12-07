export const FilmActionTypes = {
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
  Object.keys(FilmActionTypes).forEach((key) => {
    FilmActionTypes[key] = `FILM_${FilmActionTypes[key]}`;
  });
  
  const onClearDetail = () => ({
    type: FilmActionTypes.CLEAR_DETAIL,
  });
  
  const onClearState = () => ({
    type: FilmActionTypes.CLEAR_STATE,
  });
  
  // ON GET LIST
  const onGetList = (payload) => ({
    type: FilmActionTypes.GET_LIST,
    payload
  });
  
  const onGetListSuccess = (payload) => ({
    type: FilmActionTypes.GET_LIST_SUCCESS,
    payload,
  });
  
  const onGetListError = (error) => ({
    type: FilmActionTypes.GET_LIST_ERROR,
    payload: error
  });
  
  // ON LIST 
  const onGetDetail = (id) => ({
    type: FilmActionTypes.GET_DETAIL,
    id,
  });
  
  const onGetDetailSuccess = (payload) => ({
    type: FilmActionTypes.GET_DETAIL_SUCCESS,
    payload
  });
  
  const onGetDetailError = (error) => ({
    type: FilmActionTypes.GET_DETAIL_ERROR,
    payload: error,
  });
  
  // ON CREAT 
  const onCreate = (params) => ({
    type: FilmActionTypes.CREATE,
    payload: { params },
  });
  
  const onCreateSuccess = (payload) => ({
    type: FilmActionTypes.CREATE_SUCCESS,
    payload,
  });
  
  const onCreateError = (error) => ({
    type: FilmActionTypes.CREATE_ERROR,
    payload: error,
  });
  
  // ON UPDATE
  const onUpdate = ({id, params, filters, callback}) => ({
      type: FilmActionTypes.UPDATE,
      payload : {id,params},
      filters,
      callback,
  });
  
  const onUpdateSuccess = (payload) => ({
    type: FilmActionTypes.UPDATE_SUCCESS,
    payload
  });
  
  const onUpdateError = (error) => ({
    type: FilmActionTypes.UPDATE_ERROR,
    payload: error,
  });
  
  // ON DELETE
  const onDelete = ({id, filters,callback}) =>({
    type: FilmActionTypes.DELETE,
   id,
   filters,
   callback,
  });
  
  const onDeleteSuccess = (payload) => ({
    type: FilmActionTypes.DELETE_SUCCESS,
    payload,
  });
  
  const onDeleteError = (error) => ({
    type: FilmActionTypes.DELETE_ERROR,
    payload: error,
  });
  
  const FilmAction = {
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
  export default FilmAction;
  