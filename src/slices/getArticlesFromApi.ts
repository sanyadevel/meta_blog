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
  page?: number;
}

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, QueryParams>({
      query: (params:QueryParams) =>
        `articles?limit=${params.limit}&offset=${params.page}`,
    }),
  }),
  keepUnusedDataFor: 0,
});

export const { useGetArticlesQuery } = articlesApi;
