import { combineReducers } from '@reduxjs/toolkit';

import { articlesApi } from '../slices/apiSlice';

export const rootReducer = combineReducers({
  articlesApi: articlesApi.reducer,
});
