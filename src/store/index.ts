import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { rootReducer } from '../reducers/rootReducer';
import { articlesApi } from '../logics/rtkQueryLogics/getArticlesFromApi';
import registerUser from '../slices/userRegistration';
import userLogin from '../slices/userLogin';
import fullArticle from '../slices/fullArticlePage';
import postArticle from '../slices/postAnArticle';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware).concat(registerUser.middleware).concat(userLogin.middleware).concat(fullArticle.middleware).concat(postArticle.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
