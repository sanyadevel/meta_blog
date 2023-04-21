import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { rootReducer } from '../reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
