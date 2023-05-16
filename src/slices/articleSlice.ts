import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IArticleProp {
  slug?: string;
  articleTitle: string;
  articleDescription: string;
  articleText: string;
  articleTags: string[];
}

export interface IArticleState {
  totalCountPages: number;
  isFavoritedArticle: boolean;
  favoritesCount: number;
  isArticleInEditProcess: boolean;
  articleProp: IArticleProp;
}

const initialState: IArticleState = {
  totalCountPages: 50,
  isFavoritedArticle: false,
  favoritesCount: 0,
  isArticleInEditProcess: false,
  articleProp: {
    slug: '',
    articleTitle: '',
    articleDescription: '',
    articleText: '',
    articleTags: [''],
  },
};

const articleSlice = createSlice({
  name: 'articlePagination',
  initialState,
  reducers: {
    getTotalCountPages: (
      state: IArticleState,
      action: PayloadAction<number>,
    ) => {
      state.totalCountPages = action.payload;
    },
    updateArticleFavoriteStatus: (
      state: IArticleState,
      action: PayloadAction<boolean>,
    ) => {
      state.isFavoritedArticle = action.payload;
    },
    updateFavoritesCount: (
      state: IArticleState,
      action: PayloadAction<number>,
    ) => {
      state.favoritesCount = action.payload;
    },
    updateArticleEditStatus: (
      state: IArticleState,
      action: PayloadAction<boolean>,
    ) => {
      state.isArticleInEditProcess = action.payload;
    },
    updateArticle: (
      state: IArticleState,
      action: PayloadAction<IArticleProp>,
    ) => {
      state.articleProp = action.payload;
    },
  },
});

export const {
  getTotalCountPages,
  updateArticleFavoriteStatus,
  updateFavoritesCount,
  updateArticleEditStatus,
  updateArticle,
} = articleSlice.actions;

export default articleSlice.reducer;
