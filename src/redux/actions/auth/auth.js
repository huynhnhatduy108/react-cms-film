export const AuthActionTypes = {
    LOGIN: "LOGIN",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
  
    LOGOUT: "LOGOUT",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_ERROR: "LOGOUT_ERROR",
  
    REGISTER: "REGISTER",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_ERROR: "REGISTER_ERROR",
  
  
    CLEAR_DETAIL: "CLEAR_DETAIL",
    CLEAR_STATE: "CLEAR_STATE",

  };

  Object.keys(AuthActionTypes).forEach((key) => {
    AuthActionTypes[key] = `AUTH_${AuthActionTypes[key]}`;
  });

  const onClearDetail = () => ({
    type: AuthActionTypes.CLEAR_DETAIL,
  });
  
  const onClearState = () => ({
    type: AuthActionTypes.CLEAR_STATE,
  });

  // ON LOGIN 
  const onLogin = (payload) => ({
    type: AuthActionTypes.LOGIN,
    payload
  });
  
  const onLoginSuccess = (payload) => ({
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload,
  });
  
  const onLoginError = (payload) => ({
    type: AuthActionTypes.LOGIN_ERROR,
    payload
  });
  
   // ON LOGOUT
   const onLogout = (payload) => ({
    type: AuthActionTypes.LOGOUT,
    payload
  });
  
  const onLogoutSuccess = (payload) => ({
    type: AuthActionTypes.LOGOUT_SUCCESS,
    payload,
  });
  
  const onLogoutError = (payload) => ({
    type: AuthActionTypes.LOGOUT_ERROR,
    payload
  });
  
   // ON LOGOUT
   const onRegister = (payload) => ({
    type: AuthActionTypes.REGISTER,
    payload
  });
  
  const onRegisterSuccess = (payload) => ({
    type: AuthActionTypes.REGISTER_SUCCESS,
    payload,
  });
  
  const onRegisterError = (payload) => ({
    type: AuthActionTypes.REGISTER_ERROR,
    payload
  });

  const AuthAction = {
    onClearDetail,
  
    onClearState,
  
    onLogin,
    onLoginSuccess,
    onLoginError,

    onLogout,
    onLogoutSuccess,
    onLogoutError,

    onRegister,
    onRegisterSuccess,
    onRegisterError
    
  };
  export default AuthAction;
  