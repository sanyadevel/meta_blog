import { combineReducers } from '@reduxjs/toolkit';

import { articlesApi } from '../slices/getArticlesFromApi';
import articleSlice from '../slices/articleSlice';
import registerUser from '../slices/userRegistration';
import userLogin from '../slices/userLogin';
import getFullArticle from '../slices/fullArticlePage';
import postArticle from '../slices/postAnArticle';
import deleteArticle from '../slices/deleteArticle';
import getCurrentUser from '../slices/getUser';
import userProfileInfo from '../slices/userProfileInfo';
import likeArticle from '../slices/likeAnArticle';
import dislikeArticle from '../slices/dislikeAnArticle';
import editUserInfo from '../slices/editUserInfo';

export const rootReducer = combineReducers({
  articlesApi: articlesApi.reducer,
  article: articleSlice,
  registerUser: registerUser.reducer,
  userLogin: userLogin.reducer,
  userInfo: userProfileInfo,
  fullArticle: getFullArticle.reducer,
  postArticle: postArticle.reducer,
  deleteArticle: deleteArticle.reducer,
  getCurrentUser: getCurrentUser.reducer,
  likeArticle : likeArticle.reducer,
  dislikeArticle : dislikeArticle.reducer,
  editUserInfo:editUserInfo.reducer,
});
