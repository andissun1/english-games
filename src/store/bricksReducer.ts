import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Field = { [id: string]: { value: string; isOpen: boolean } };

interface BricksSlice {
  numbers: { firstNumber: number; secondNumber: number };
  board: Field;
}

const initialState: BricksSlice = localStorage.getItem('bricks')
  ? JSON.parse(localStorage.getItem('bricks')!)
  : {
      numbers: { firstNumber: 0, secondNumber: 0 },
      board: Object.assign(
        {},
        Array.from({ length: 25 }, () => ({ value: '', isOpen: false }))
      ),
    };

export const bricksSlice = createSlice({
  name: 'bricks',
  initialState,
  reducers: {
    setNumbers: (state, action: PayloadAction<number[]>) => {
      state.numbers.firstNumber = action.payload[0];
      state.numbers.secondNumber = action.payload[1];
    },
    setBoard: (state, action: PayloadAction<Field>) => {
      state.board = action.payload;
    },
    closeAllCards: (state) => {
      for (let index in state.board) state.board[index].isOpen = false;
    },
  },
  selectors: {
    numbers: (state) => state.numbers,
    board: (state) => state.board,
  },
});

export const {
  actions: bricksActions,
  reducer: bricksReducer,
  selectors: bricksSelectors,
} = bricksSlice;
