import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Field = { [id: string]: { value: string } };

interface IinitialState {
  title: String;
  description: String;
  question: String;
  board: Field;
  points: Number;
  image: String;
}

type IGameInfo = {
  title: String;
  description: String;
  question: String;
  image: String;
};

const initialState: IinitialState = localStorage.getItem('disasters')
  ? JSON.parse(localStorage.getItem('disasters')!)
  : {
      title: 'Natural Disasters',
      description: `Talk to your partner or within your group about natural disasters for two minutes. While you are talking, you will be given points for every word you use accurately. You can only earn the points once for each word! However, points will be deducted for the use of any words from the banned column.`,
      question: 'Are you an expert speaker about natural disasters?',
      board: [
        { value: 'earthquake' },
        { value: 'debris' },
        { value: 'amplitude' },
        { value: 'like' },
        { value: 'tsunami' },
        { value: 'fault' },
        { value: 'tectonic' },
        { value: 'erm' },
        { value: 'flood' },
        { value: 'Richter' },
        { value: 'magnitude' },
        { value: 'I think' },
        { value: 'hurricane' },
        { value: 'tremor' },
        { value: 'aftershock' },
        { value: 'well' },
        { value: 'tornado' },
        { value: 'tidal' },
        { value: 'seismic' },
        { value: 'you know' },
      ],
      points: 0,
      image: '/images/disasters.jpeg',
    };

export const disastersSlice = createSlice({
  name: 'disasters',
  initialState,
  reducers: {
    setGameInfo: (state, action: PayloadAction<IGameInfo>) => {
      return { ...state, ...action.payload };
    },
    setBoard: (state, action: PayloadAction<Field>) => {
      state.board = action.payload;
    },
    addPoints: (state, action: PayloadAction<Number>) => {
      state.points = Number(state.points) + Number(action.payload);
    },
    resetPoints: (state) => {
      state.points = 0;
    },
  },
  selectors: {
    gameInfo: (state) => state,
    points: (state) => state.points,
  },
});

export const {
  reducer: disastersReducer,
  actions: disastersActions,
  selectors: disastersSelectors,
} = disastersSlice;
