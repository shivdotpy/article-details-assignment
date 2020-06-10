import { ApiCall } from '../../api';
const token = localStorage.getItem('AuthToken');
export const getUserFeeds = async (params) => {
  const token = localStorage.getItem('AuthToken');
  const { limit, offset } = params;
  const url = `/articles/feed?limit=${limit}&offset=${offset}`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getTagLists = async (params) => {
  const url = `/tags`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getTagDatas = async (params) => {
  const { limit, offset, tag } = params;
  const url = `/articles/feed?limit=${limit}&offset=${offset}&tag=${tag}`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getGlobalFeeds = async (params) => {
  const { limit, offset } = params;
  const url = `/articles?limit=${limit}&offset=${offset}`;
  try {

    const { data } = await ApiCall({ url: url });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getFavouriteArticles = async (params) => {
  const { favorited, limit, offset } = params;
  const url = `/articles?favorited=${favorited}&limit=${limit}&offset=${offset}`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getMyArticles = async (params) => {
  const { author, limit, offset } = params;
  const url = `/articles?author=${author}&limit=${limit}&offset=${offset}`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getSlugArticles = async (params) => {
  const { slug } = params;
  const url = `/articles/${slug}`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getClickFavouriteArticles = async (params) => {
  const { slug } = params;
  const url = `/articles/${slug}/favorite`;
  const method = 'post';
  try {
    const { data } = await ApiCall({ method: method, url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const postNewArticle = async (params) => {
  const token = localStorage.getItem('AuthToken');
  const { article } = params;
  const url = `/articles`;
  try {
    const { data } = await ApiCall({ method: 'POST', url: url, authorizationToken: token, params: article });
    return data;
  } catch (e) {
    throw e;
  }
};

export const deleteArticle = async (params) => {
  const { slug } = params;
  const url = `/articles/${slug}`;
  const method = 'delete';
  try {
    const { data } = await ApiCall({ method: method, url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

export const updateArticle = async (params) => {
  const { article } = params;
  const { slug } = params;
  const url = `/articles/${slug}`;
  try {
    const { data } = await ApiCall({ method: 'PUT', url: url, authorizationToken: token, params: article });
    return data;
  } catch (e) {
    throw e;
  }
};