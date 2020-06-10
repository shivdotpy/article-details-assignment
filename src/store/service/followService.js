import { ApiCall } from '../../api';
export const getFollow = async (params) => {
  const { username } = params;
  const token = localStorage.getItem('AuthToken')
  const url = `/profiles/${username}/follow`;
  try {
    const { data } = await ApiCall({ method: 'POST', url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};