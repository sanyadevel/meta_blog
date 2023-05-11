import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICustomArticleResponse } from './postAnArticle';

interface IEditArticle {
  slug: string;
  newArticle: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }
}

export const editArticle = createApi({
  reducerPath: 'editArticle',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    editedArticle: builder.mutation<ICustomArticleResponse, IEditArticle
    >({
      query: ({ slug, newArticle }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with your JWT token
        },
        body: JSON.stringify({ 'article': newArticle } ),
      }),
    }),
  }),
});

export const { useEditedArticleMutation } = editArticle;
export default editArticle;
