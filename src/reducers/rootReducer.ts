import { combineReducers } from '@reduxjs/toolkit';

import { articlesApi } from '../logics/rtkQueryLogics/getArticlesFromApi';
import articleSlice from '../slices/articleSlice';

export const rootReducer = combineReducers({
  articlesApi: articlesApi.reducer,
  article: articleSlice,
});
