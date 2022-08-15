import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postings: [],
};

export const addDetailThunk = createAsyncThunk(
  "postDetail",
  async (payload, api) => {
    console.log(payload);
    try {
      const data = await axios.post("http://localhost:3001/postings", payload);
      console.log(data);
      return api.fulfillWithValue(data.data);
    } catch (error) {
      return api.rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [addDetailThunk.fulfilled]: (state, action) => {
      state.postings = action.payload;
    },
    [addDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.postings = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
