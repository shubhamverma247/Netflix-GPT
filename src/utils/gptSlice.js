import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    toggleGPT: false,
  },
  reducers: {
    toggleGPTSearch: (state) => {
      state.toggleGPT = !state.toggleGPT;
    },
  },
});

export const { toggleGPTSearch } = gptSlice.actions;
export default gptSlice.reducer;
