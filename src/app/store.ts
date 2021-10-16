import { configureStore } from '@reduxjs/toolkit';
const r = () => {
  return 5
}

const store = configureStore({
  reducer: r
});

export type RootState = ReturnType<typeof store.getState> // Gets the return type of getState 

export type AppDispatch = typeof store.dispatch // Reducers types 
