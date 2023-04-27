import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserInfo {
  userDatas: {
    bio?: null | string;
    email?: string;
    image?: string | null;
    token?: string;
    username?: string;
  };
}

const initialState: IUserInfo = {
  userDatas: {
    bio: null,
    email: '',
    image: '',
    token: '',
    username: '',
  },
};


const userProfileInfo = createSlice({
  name: 'userProfileInfo',
  initialState,
  reducers: {
    uploadUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      return action.payload;
    },
  },
});

export const { uploadUserInfo } = userProfileInfo.actions;
export default userProfileInfo.reducer;
