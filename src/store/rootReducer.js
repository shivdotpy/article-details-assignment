import { combineReducers } from 'redux';
import Articles from './reducer/articleReducer';
import AuthReducer from './reducer/authReducer';
import ProfileData from './reducer/profileReducer';
import CommentData from './reducer/commentReducer';
import FollowData from './reducer/followReducer';

const createRootReducer = () => combineReducers({
  Articles,
  AuthReducer,
  ProfileData,
  CommentData,
  FollowData
});

export default createRootReducer;