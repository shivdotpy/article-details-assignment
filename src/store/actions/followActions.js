import { getFollow } from './../service/followService';

export const getFollowData = (params) => {
  return (dispatch) => {
    dispatch({
      type: 'GET_FOLLOW_REQUEST',
    });
    try {
      return getFollow(params)
        .then((data) => {
          dispatch({
            type: 'GET_FOLLOW_SUCCESS',
            payload: data.follow,
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






