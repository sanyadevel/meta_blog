import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IFullArticle {
  slug?: string;
}

export interface IFullArticleResponse {
  article: {
    slug?: string;
    title: string;
    description: string;
    body: string;
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

const getFullArticle = createApi({
  reducerPath: 'fullArticle',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  endpoints: (builder) => ({
    fullArticle: builder.query<IFullArticleResponse, IFullArticle>({
      query: ({ slug }) => {
        return `articles/${slug}`;
      },
    }),
  }),
});

export const { useFullArticleQuery } = getFullArticle;
export default getFullArticle;