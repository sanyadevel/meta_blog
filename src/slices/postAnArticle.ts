import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICustomArticle } from '../components/CustomArticle/CustomArticle';

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

export const postArticle = createApi({
  reducerPath: 'postArticle',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realworld.io/api' }),
  endpoints: (builder) => ({
    customArticle: builder.mutation<ICustomArticleResponse, ICustomArticle
    >({
      query: (customArticle) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with your JWT token
        },
        body: JSON.stringify({ article: customArticle } ),
      }),
    }),
  }),
});

export const { useCustomArticleMutation } = postArticle;
export default postArticle;
