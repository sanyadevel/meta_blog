import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deleteArticle = createApi({
  reducerPath: 'deleteArticle',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    deleteArticle: builder.mutation({
      query: (slug:string) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with your JWT token
        },
      }),
    }),
  }),
});

export const { useDeleteArticleMutation } = deleteArticle;
export default deleteArticle;
