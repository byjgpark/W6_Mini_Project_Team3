import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

const initialState = {
  post: {
    id: "",
    title: "",
    place: "",
    star: "",
    content: "",
  },
};
//게시물 상세조회 /api/cards/{id}
export const getDetailThunk = createAsyncThunk(
  "getPost",
  async (payload, api) => {
    try {
      console.log(payload);
      const { data } = await instance.get(`api/cards/${payload}`);
      console.log(data);
      return api.fulfillWithValue(data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
//게시물 수정 /api/auth/cards/{id} // /api/auth/cards/{id}
export const editDetailThunk = createAsyncThunk(
  "editDetail",
  async (payload, api) => {
    console.log(payload);
    try {
      const { data } = await instance.put(`api/auth/cards/${payload.id}`, {
        content: payload.content,
      });
      console.log(data);
      // return api.fulfillWithValue(payload);
      return console.log(data);
    } catch (error) {
      // return api.rejectWithValue(error);
      return console.log(error);
    }
  }
);

export const targetPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getDetailThunk.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [getDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.error = action.payload;
    },
    [editDetailThunk.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [editDetailThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {} = targetPostSlice.actions;
export default targetPostSlice.reducer;
