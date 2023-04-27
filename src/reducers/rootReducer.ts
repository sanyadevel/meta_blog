import { combineReducers } from '@reduxjs/toolkit';

import { articlesApi } from '../logics/rtkQueryLogics/getArticlesFromApi';
import articleSlice from '../slices/articleSlice';
import registerUser from '../slices/userRegistration';
import userLogin from '../slices/userLogin';
import userProfileInfo from '../slices/userProfileInfo';

export const rootReducer = combineReducers({
  articlesApi: articlesApi.reducer,
  article: articleSlice,
  registerUser: registerUser.reducer,
  userLogin: userLogin.reducer,
  userInfo: userProfileInfo,
});
