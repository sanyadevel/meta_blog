import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserLoginDetails {
  [key: string]:{
    email: string;
    password: string;
  }
}

export interface UserLoginResponse {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string | null;
    token: string;
  };
}

const userLogin = createApi({
  reducerPath: 'userLogin',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserLoginResponse, UserLoginDetails>({
      query: (userLoginDetails) => {
        return {
          url: '/users/login',
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( userLoginDetails ),
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = userLogin;
export default userLogin;
