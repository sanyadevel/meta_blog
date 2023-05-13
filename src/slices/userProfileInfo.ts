import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserInfo {
  userDatas?: {
    bio?: null | string;
    email?: string;
    image?: string | null;
    token?: string;
    username?: string;
  };
  isUserLoggedIn?: boolean;
}

const initialState: IUserInfo = {
  userDatas: {
    bio: null,
    email: '',
    image: '',
    token: '',
    username: '',
  },
  isUserLoggedIn: false,
};

const userProfileInfo = createSlice({
  name: 'userProfileInfo',
  initialState,
  reducers: {
    uploadUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userDatas = action.payload.userDatas;
    },
    changeUserActiveStatus: (state, action: PayloadAction<{ isUserLoggedIn: boolean }>) => {
      state.isUserLoggedIn = action.payload.isUserLoggedIn;
    },
  },
});

export const { uploadUserInfo, changeUserActiveStatus } = userProfileInfo.actions;
export default userProfileInfo.reducer;
