import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [],
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setPets: (state, action) => {
      state.pets.push(action.payload)
      // localStorage.setItem("pets", action.payload);
    },
  },
});

export const { setPets } = petSlice.actions;

export default petSlice.reducer;
