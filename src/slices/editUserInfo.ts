import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface IEditUserInfo {
  [key:string]:{
    email: string;
    password: string;
    username: string;
    bio:string;
    image?:string;
  }
}

interface IEditUserInfoResponse {
  [key:string]:{
    bio?: null | string;
    email?: string;
    image?: string | null;
    token?: string;
    username?: string;

  }
}

export const editUserInfo = createApi({
  reducerPath: 'editUserInfo',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    editUserInfo: builder.mutation <IEditUserInfoResponse, IEditUserInfo>({
      query: (editedInfo) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`, // Replace with your JWT token
        },
        body: JSON.stringify( editedInfo ),
      }),
    }),
  }),
});

export const { useEditUserInfoMutation } = editUserInfo;
export default editUserInfo;
