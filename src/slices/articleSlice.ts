import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IArticleState {
  currentPage?: number;
  totalCountPages: number;
  slug?: string;
  isFavoritedArticle:boolean;
  favoritesCount:number;
}

const initialState: IArticleState = {
  currentPage: 0,
  totalCountPages: 50,
  slug:'',
  isFavoritedArticle:false,
  favoritesCount: 0,
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
    updateArticleFavoriteStatus:(state:IArticleState, action:PayloadAction<boolean>)=>{
      state.isFavoritedArticle = action.payload;
    },
    updateFavoritesCount:(state:IArticleState, action:PayloadAction<number>)=>{
      state.favoritesCount = action.payload;
    },
  },
});

export const { changeArticlePage, getTotalCountPages, updateSlug, updateArticleFavoriteStatus, updateFavoritesCount } = articleSlice.actions;
export default articleSlice.reducer;
