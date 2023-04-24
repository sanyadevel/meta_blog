import { combineReducers } from '@reduxjs/toolkit';

import { articlesApi } from '../logics/rtkQueryLogics/getArticlesFromApi';
import articleSlice from '../slices/articleSlice';
import registerUser from '../slices/userRegistration';

export const rootReducer = combineReducers({
  articlesApi: articlesApi.reducer,
  article: articleSlice,
  [registerUser.reducerPath]: registerUser.reducer,
});
