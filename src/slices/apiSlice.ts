import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Article {
  slug: string;
  title: string;
}

interface ArticlesResponse {
  articles: Article[];
}

interface GetArticlesParams {
  limit: number;
  offset: number;
}

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.realworld.io/api/',
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, GetArticlesParams>({
      query: (params) =>
        `articles?limit=${params.limit}&offset=${params.offset}`,
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
