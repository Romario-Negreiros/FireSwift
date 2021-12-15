import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import usersReducer from '../features/users/usersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState> // Gets the return type of getState 

export type AppDispatch = typeof store.dispatch // Reducers types 
