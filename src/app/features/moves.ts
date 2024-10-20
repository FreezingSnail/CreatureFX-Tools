import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state


export interface Move {
  name: string;
  id: number;
  type: string;
  power: number;
  accuracy: number;
  effect: string;
}

interface MoveListState {
  value: Move[]; // An array of strings for the list
}

// Define the initial state using that type
const initialState: MoveListState = {
  value: [], // Initially, the list is empty
};

const moveData = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setMoveList: (state, action: PayloadAction<Move[]>) => {
      state.value = action.payload; // Update the list with new data
    },
  },
});

// Export the action and reducer
export const { setMoveList } = moveData.actions;
export default moveData.reducer;
