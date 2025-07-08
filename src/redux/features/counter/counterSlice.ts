import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface CounterState {
  value : number
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    }
  },
});

export const counterSelect = (state: RootState) => state.counter.value

export default counterSlice;
