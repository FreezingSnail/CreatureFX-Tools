
// features/listSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move } from './moves';

// Define a type for the slice state


export interface Creature {
  name: string;
  id: number;
  type1: string;
  type2: string;
  evelevel: number;
  atk: number;
  deff: number;
  spcatk: number;
  spcdef: number;
  hp: number;
  spd: number;
  moveList: Move[];
  move1: number;
  move2: number;
  move3: number;
  move4: number;
}

interface CreatureListState {
  value: Creature[]; // An array of strings for the list
}

// Define the initial state using that type
const initialState: CreatureListState = {
  value: [], // Initially, the list is empty
};

const creatureData = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setCreatureList: (state, action: PayloadAction<Creature[]>) => {
      state.value = action.payload; // Update the list with new data
    },
  },
});

// Export the action and reducer
export const { setCreatureList } = creatureData.actions;
export default creatureData.reducer;

