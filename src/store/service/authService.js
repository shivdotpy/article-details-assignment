import { ApiCall } from '../../api';

/**
 * 
 * @param {object} params
 * function used to call API for login user 
 */
export const loginService = async (params) => {
  const url = `/users/login`;
  try {
    const { data } = await ApiCall({ method: 'POST', url: url, params });
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * 
 * @param {object} params
 * function used to call API for sign up user 
 */
export const signUpService = async (params) => {
  const url = `/users`;
  try {
    const { data } = await ApiCall({ method: 'POST', url: url, params });
    return data;
  } catch (e) {
    throw e;
  }
};