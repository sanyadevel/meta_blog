import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IArticleState {
  currentPage?: number;
  totalCountPages: number;
  slug?: string;
}

const initialState: IArticleState = {
  currentPage: 0,
  totalCountPages: 50,
  slug:'',
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
    updateSlug: (state: IArticleState, action:PayloadAction<string>) => {
      state.slug = action.payload;
    },
  },
});

export const { changeArticlePage, getTotalCountPages, updateSlug } = articleSlice.actions;
export default articleSlice.reducer;
