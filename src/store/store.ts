import { configureStore } from '@reduxjs/toolkit';
import { bricksReducer } from './bricksReducer';
import { disastersReducer } from './naturalDisastersReducer';

export const store = configureStore({
  reducer: {
    bricks: bricksReducer,
    disasters: disastersReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

store.subscribe(() => {
  const bricks = JSON.stringify(store.getState().bricks);
  if (bricks) localStorage.setItem('bricks', bricks);

  const disasters = JSON.stringify(store.getState().disasters);
  if (disasters) localStorage.setItem('disasters', disasters);
});
