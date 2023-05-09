import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Article {
  slug: string;
  title: string;
}

interface ArticlesResponse {
  articles: Article[];
}

interface QueryParams {
  limit: number;
  offset?: number;
}

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, QueryParams>({
      query: (params:QueryParams) =>({
        url: `articles?limit=${params.limit}&offset=${params.offset}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with JWT token
        },
      }),
    }),
  }),
  keepUnusedDataFor: 0,
});

export const { useGetArticlesQuery } = articlesApi;
