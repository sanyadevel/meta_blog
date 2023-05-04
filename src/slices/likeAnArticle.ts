import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const likeArticle = createApi({
  reducerPath: 'likeArticle',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    likeArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with your JWT token
        },
      }),
    }),
  }),
});

export const { useLikeArticleMutation } = likeArticle;
export default likeArticle;
