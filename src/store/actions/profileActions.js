import { getProfile } from './../service/profileService';

/**
 * 
 * @param {object} params
 * should dispatch action for profile 
 */
export const getProfileData = (params) => {
  return (dispatch) => {
    dispatch({
      type: 'GET_PROFILE_REQUEST',
    });
    try {
      return getProfile(params)
        .then((data) => {
          dispatch({
            type: 'GET_PROFILE_SUCCESS',
            payload: data.profile,
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






