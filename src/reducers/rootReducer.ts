import { combineReducers } from '@reduxjs/toolkit';

import userProfileInfo from '../slices/userProfileInfo';
import { articlesApi } from '../slices/getArticlesFromApi';
import articleSlice from '../slices/articleSlice';
import registerUser from '../slices/userRegistration';
import userLogin from '../slices/userLogin';
import getFullArticle from '../slices/fullArticlePage';
import editArticle from '../slices/editAnArticle';
import editUserInfo from '../slices/editUserInfo';
import dislikeArticle from '../slices/dislikeAnArticle';
import getCurrentUser from '../slices/getUser';
import postArticle from '../slices/postAnArticle';
import likeArticle from '../slices/likeAnArticle';
import deleteArticle from '../slices/deleteArticle';

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
  editArticle:editArticle.reducer,
});
