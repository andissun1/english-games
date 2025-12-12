import { configureStore } from '@reduxjs/toolkit';
import { bricksReducer } from './bricksReducer';

export const store = configureStore({
  reducer: {
    bricks: bricksReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

store.subscribe(() => {
  const bricks = JSON.stringify(store.getState().bricks);
  if (bricks) localStorage.setItem('bricks', bricks);
});
