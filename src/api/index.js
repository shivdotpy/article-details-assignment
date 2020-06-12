import axios from "axios";

/**
 * 
 * @param {object}
 * should call axios for api calls  
 */
export const ApiCall = ({
  url,
  method = 'get',
  params,
  headers,
  authorizationToken = '',
}) => {
  if (!url) {
    throw new Error('"url" cannot be empty!');
  }
  const customRequestHeaders = {
    ...(headers && { headers }),
    ...(
      authorizationToken && {
        'authorization': "Token " + JSON.stringify(authorizationToken),
      }
    )
  };
  const apiUrl = `https://conduit.productionready.io/api${url}`
  const axiosParams = {
    url: apiUrl,
    method,
    headers: customRequestHeaders,
    ...(params && { data: params }),
  };

  return axios(axiosParams);
};
