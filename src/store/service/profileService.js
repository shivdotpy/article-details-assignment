import { ApiCall } from '../../api';
export const getProfile = async (params) => {
  const { username } = params;
  const token = localStorage.getItem('AuthToken')
  const url = `/profiles/${username}`;
  try {
    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};