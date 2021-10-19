import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../global/types';

export type userState = {
  user: User | null;
};

const initialState: userState | null = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogged: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    userUnLogged: (state, action: PayloadAction<null>) => {
      state.user = action.payload
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
});

export const { userLogged, userUnLogged, updateUser } = userSlice.actions;

export default userSlice.reducer;
