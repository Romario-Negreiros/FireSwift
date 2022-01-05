import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import userChatsSlice from '../features/userChats/userChatsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    chats: userChatsSlice,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState> // Gets the return type of getState 

export type AppDispatch = typeof store.dispatch // Reducers types 
