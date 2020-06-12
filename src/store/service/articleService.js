import { ApiCall } from '../../api';
const token = localStorage.getItem('AuthToken');

/**
 * 
 * @param {object} params
 * function used to call API for get user feeds 
 */
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

/**
 * 
 * @param {object} params
 * function used to call API for get tags list
 */

export const getTagLists = async (params) => {
  const url = `/tags`;
  try {
    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * 
 * @param {object} params
 * function used to call API for get feeds data according to tag 
 */
export const getTagDatas = async (params) => {
  // const token = localStorage.getItem('AuthToken');
  const { limit, offset, tag } = params;
  let url = '';
  // if (token) {
  //   url = `/articles/feed?limit=${limit}&offset=${offset}&tag=${tag}`;
  // }
  // else {
  url = `/articles?limit=${limit}&offset=${offset}&tag=${tag}`;
  // }
  try {
    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * 
 * @param {object} params
 * function used to call API for global feeds
 */
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

/**
 * 
 * @param {object} params
 * function used to call API for get favourite article data
 */
export const getFavouriteArticles = async (params) => {
  const token = localStorage.getItem('AuthToken');
  const { favorited, limit, offset } = params;
  const url = `/articles?favorited=${favorited}&limit=${limit}&offset=${offset}`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * 
 * @param {object} params
 * function used to call API for get data for my article
 */
export const getMyArticles = async (params) => {
  const token = localStorage.getItem('AuthToken');
  const { author, limit, offset } = params;
  const url = `/articles?author=${author}&limit=${limit}&offset=${offset}`;
  try {

    const { data } = await ApiCall({ url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * 
 * @param {object} params
 * function used to call API for get articles based on slug 
 */
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

/**
 * 
 * @param {object} params
 * function used to call API for post/delete favourite articles
 */
export const getClickFavouriteArticles = async (params) => {
  const token = localStorage.getItem('AuthToken');
  const { slug, methodType } = params;
  const url = `/articles/${slug}/favorite`;
  const method = methodType;
  try {
    const { data } = await ApiCall({ method: method, url: url, authorizationToken: token });
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * 
 * @param {object} params
 * function used to call API for post new added article 
 */
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

/**
 * 
 * @param {object} params
 * function used to call API for delete article 
 */
export const deleteArticle = async (params) => {
  const token = localStorage.getItem('AuthToken');
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

/**
 * 
 * @param {object} params
 * function used to call API for update article 
 */
export const updateArticle = async (params) => {
  const token = localStorage.getItem('AuthToken');
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