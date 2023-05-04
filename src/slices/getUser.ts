import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface ICurrentUserToken {
  token:string;
}

interface ICurrentUserResponse {
  [key: string]:{
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  }
}
export const getCurrentUser = createApi({
  reducerPath: 'getCurrentUser',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    currentUser: builder.query<ICurrentUserResponse, ICurrentUserToken>({
      query: (slug) => ({
        url: 'user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const { useCurrentUserQuery } = getCurrentUser;
export default getCurrentUser;
