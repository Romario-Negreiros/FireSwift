import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Chat } from '../../global/types';

type userChatsState = {
  chats: Chat[] | null;
};

const initialState: userChatsState = {
  chats: null,
};

export const userChatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    loggedUserChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    userLoggedOut: (state, action: PayloadAction<null>) => {
      state.chats = action.payload;
    },
    updateUserChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = [...action.payload];
    },
  },
});

export const { loggedUserChats, userLoggedOut, updateUserChats } = userChatsSlice.actions;

export default userChatsSlice.reducer;