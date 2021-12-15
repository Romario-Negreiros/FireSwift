import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../global/types';

type usersState = {
  users: User[] | null;
};

const initialState: usersState = {
  users: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    queryUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    clearUsers: (state, action: PayloadAction<null>) => {
      state.users = action.payload;
    }
  }
});

export const { queryUsers, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;