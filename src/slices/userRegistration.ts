import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserRegistrationDetails {
  [key: string]: {
    username: string;
    email: string;
    password?: string;
    confirmPassword?: string;
  }
}

export interface UserRegistrationResponse {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string | null;
    token: string;
  };
}

const registerUser = createApi({
  reducerPath: 'registerUser',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserRegistrationResponse, UserRegistrationDetails>({
      query: (user) => {
        return {
          url: 'users',
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
