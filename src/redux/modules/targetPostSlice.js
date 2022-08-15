import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posting: {
    id: "",
    title: "",
    content: "",
  },
};
export const getDetailThunk = createAsyncThunk(
  "getPost",
  async (payload, api) => {
    try {
      const data = await axios.get(`http://localhost:3001/postings/${payload}`);
      return api.fulfillWithValue(data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
export const deleteDetailThunk = createAsyncThunk(
  "deleteDetail",
  async (payload, api) => {
    console.log(payload);
    try {
      axios.delete(`http://localhost:3001/postings/${payload}`);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
export const editDetailThunk = createAsyncThunk(
  "editDetail",
  async (payload, api) => {
    try {
      axios.patch(`http://localhost:3001/postings/${payload.id}`, payload);
      return api.fulfillWithValue(payload);
    } catch (error) {
      return api.rejectWithValue(error);
    }
  }
);

export const targetPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getDetailThunk.fulfilled]: (state, action) => {
      state.posting = action.payload;
    },
    [getDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.error = action.payload;
    },
    [deleteDetailThunk.fulfilled]: (state, action) => {
      state.posting = state.filter((list) => list.id !== action.payload);
    },
    [deleteDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.posting = action.payload;
    },
    [editDetailThunk.fulfilled]: (state, action) => {
      state.posting.content = action.payload.content;
    },
    [editDetailThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {} = targetPostSlice.actions;
export default targetPostSlice.reducer;
