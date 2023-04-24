import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IArticleState {
  totalCountPages: number;
  currentPage?: number;
}

const initialState: IArticleState = {
  totalCountPages: 50,
  currentPage: 1,
};

const articleSlice = createSlice({
  name: 'articlePagination',
  initialState,
  reducers: {
    changeArticlePage: (state: IArticleState, action:PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    getTotalCountPages: (state: IArticleState, action:PayloadAction<number>) => {
      state.totalCountPages = action.payload;
    },
  },
});

export const { changeArticlePage, getTotalCountPages } = articleSlice.actions;
export default articleSlice.reducer;
