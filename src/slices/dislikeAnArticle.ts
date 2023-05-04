import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dislikeArticle = createApi({
  reducerPath: 'dislikeArticle',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    dislikeArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with your JWT token
        },
      }),
    }),
  }),
});

export const { useDislikeArticleMutation } = dislikeArticle;
export default dislikeArticle;
