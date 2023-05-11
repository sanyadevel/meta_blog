import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { rootReducer } from '../reducers/rootReducer';
import { articlesApi } from '../slices/getArticlesFromApi';
import registerUser from '../slices/userRegistration';
import userLogin from '../slices/userLogin';
import fullArticle from '../slices/fullArticlePage';
import postArticle from '../slices/postAnArticle';
import deleteArticle from '../slices/deleteArticle';
import getCurrentUser from '../slices/getUser';
import likeArticle from '../slices/likeAnArticle';
import dislikeArticle from '../slices/dislikeAnArticle';
import editUserInfo from '../slices/editUserInfo';
import editArticle from '../slices/editAnArticle';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articlesApi.middleware)
      .concat(registerUser.middleware)
      .concat(userLogin.middleware)
      .concat(fullArticle.middleware)
      .concat(postArticle.middleware)
      .concat(deleteArticle.middleware)
      .concat(getCurrentUser.middleware)
      .concat(likeArticle.middleware)
      .concat(dislikeArticle.middleware)
      .concat(editUserInfo.middleware)
      .concat(editArticle.middleware),

});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
