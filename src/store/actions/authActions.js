import { loginService, signUpService } from './../service/authService';

/**
 * 
 * @param {object} params
 * should dispatch action for login
 */
export const login = (params) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_REQUEST',
    });
    try {
      return loginService(params)
        .then((data) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data.user,
          });
          return data;
        })
    }
    catch (error) {
      console.log(error);
      throw error;
    };
  }
}

/**
 * 
 * @param {object} params
 * should dispatch action for signUp
 */
export const signUp = (params) => {
  return (dispatch) => {
    dispatch({
      type: 'SIGNUP_REQUEST',
    });
    try {
      return signUpService(params)
        .then((data) => {
          dispatch({
            type: 'SIGNUP_SUCCESS',
            payload: data.user,
          });
          return data;
        })
    }
    catch (error) {
      console.log(error);
      throw error;
    };
  }
}