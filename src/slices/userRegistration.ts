import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const registerUser = createApi({
  reducerPath: 'registerUser',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realworld.io/api' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: '/users',
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( user ),
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation } = registerUser;
export default registerUser;
