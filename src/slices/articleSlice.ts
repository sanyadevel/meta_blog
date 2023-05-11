import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IArticleState {
  currentPage?: number;
  totalCountPages: number;
  slug?: string;
  isFavoritedArticle:boolean;
  favoritesCount:number;
  isArticleInEditProcess:boolean;
  articleTitle:string;
  articleDescription:string;
  articleText:string;
  articleTags:string[];
}

const initialState: IArticleState = {
  currentPage: 0,
  totalCountPages: 50,
  slug:'',
  isFavoritedArticle:false,
  favoritesCount: 0,
  isArticleInEditProcess:false,
  articleDescription:'',
  articleTitle:'',
  articleText:'',
  articleTags:[''],
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
    updateArticleEditStatus:(state:IArticleState, action:PayloadAction<boolean>)=>{
      state.isArticleInEditProcess = action.payload;
    },
    updateArticleDescription:(state:IArticleState, action :PayloadAction<string>)=>{
      state.articleDescription = action.payload;
    },
    updateArticleText:(state:IArticleState, action :PayloadAction<string>)=>{
      state.articleText = action.payload;
    },
    updateArticleTags:(state:IArticleState, action :PayloadAction<string[]>)=>{
      state.articleTags = action.payload;
    },
    updateArticleTitle:(state:IArticleState, action :PayloadAction<string>)=>{
      state.articleTitle = action.payload;
    },
  },
});

export const { changeArticlePage, getTotalCountPages, updateSlug, updateArticleFavoriteStatus, updateFavoritesCount, updateArticleEditStatus, updateArticleDescription, updateArticleText, updateArticleTags, updateArticleTitle } = articleSlice.actions;
export default articleSlice.reducer;
