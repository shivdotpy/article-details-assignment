import { ApiCall } from '../../api';
export const getComment = async (params) => {
  const { slug } = params;
  const token = localStorage.getItem('AuthToken')
  const url = `/articles/${slug}/comments`;
  try {
    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};
//for delete comment data
export const deleteComment = async (params) => {
  const { slug } = params;
  const { id } = params;
  const token = localStorage.getItem('AuthToken')
  const url = `/articles/${slug}/comments/${id}`;
  try {
    const { data } = await ApiCall({ method: 'DELETE', url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};
export const postComment = async (params) => {
  const { slug } = params;
  const { comment } = params;
  const token = localStorage.getItem('AuthToken')
  const url = `/articles/${slug}/comments`;
  try {
    const { data } = await ApiCall({ method: 'POST', url: url, authorizationToken: token, params: comment });
    return data;
  } catch (e) {
    throw e;
  }
};