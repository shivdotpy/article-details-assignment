import { ApiCall } from '../../api';
const token = localStorage.getItem('AuthToken')
export const loginService = async (params) => {
  const url = `/users/login`;
  try {
    const { data } = await ApiCall({ method: 'POST', url: url, params });
    return data;
  } catch (e) {
    throw e;
  }
};
export const signUpService = async (params) => {
  const url = `/users`;
  try {
    const { data } = await ApiCall({ method: 'POST', url: url, params });
    return data;
  } catch (e) {
    throw e;
  }
};