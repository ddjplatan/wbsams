// petSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPets = createAsyncThunk("pets/fetchPets", async () => {
  const response = await fetch("/api/pet"); // Replace with your actual API endpoint
  return response.json();
});

const petSlice = createSlice({
  name: "pets",
  initialState: { pets: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default petSlice.reducer;
