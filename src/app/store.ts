import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState> // Gets the return type of getState 

export type AppDispatch = typeof store.dispatch // Reducers types 
