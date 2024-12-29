import { configureStore } from '@reduxjs/toolkit';
import jokesReducer from './features/jokesSlice';
import memeReducer from './features/memeSlice'

export const store = configureStore({
  reducer: {
    jokes: jokesReducer,
    meme: memeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;