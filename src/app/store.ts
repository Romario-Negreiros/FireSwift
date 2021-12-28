import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import usersReducer from '../features/users/usersSlice';
import userChatsSlice from '../features/userChats/userChatsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    chats: userChatsSlice,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState> // Gets the return type of getState 

export type AppDispatch = typeof store.dispatch // Reducers types 
