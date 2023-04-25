import { combineReducers } from '@reduxjs/toolkit';

import { articlesApi } from '../logics/rtkQueryLogics/getArticlesFromApi';
import articleSlice from '../slices/articleSlice';
import registerUser from '../slices/userRegistration';
import userLogin from '../slices/userLogin';

export const rootReducer = combineReducers({
  articlesApi: articlesApi.reducer,
  article: articleSlice,
  registerUser: registerUser.reducer,
  userLogin: userLogin.reducer,
});
