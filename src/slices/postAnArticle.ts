import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface ICustomArticleResponse {
  [key: string]: {
    title: string;
    slug: string;
    body: string;
    description: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
}

interface IArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export const postArticle = createApi({
  reducerPath: 'postArticle',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    customArticle: builder.mutation<ICustomArticleResponse, IArticle
    >({
      query: (customArticle) => ({
        url: 'articles',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with your JWT token
        },
        body: JSON.stringify({ 'article': customArticle } ),
      }),
    }),
  }),
});

export const { useCustomArticleMutation } = postArticle;
export default postArticle;
