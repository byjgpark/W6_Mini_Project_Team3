import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

const initialState = {
  post: {
    id: "",
    title: "",
    place: "",
    star: "1",
    content: "",
  },
};
//게시물 상세조회 /api/cards/{id}
export const getDetailThunk = createAsyncThunk(
  "getPost",
  async (payload, api) => {
    try {
      const { data } = await instance.get(`/api/cards/${payload}`);
      return api.fulfillWithValue(data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
//게시물 수정 /api/auth/cards/{id}
export const editDetailThunk = createAsyncThunk(
  "editDetail",
  async (payload, api) => {
    try {
      const { data } = await instance.put(`/api/auth/cards/${payload.id}`, {
        content: payload.content,
      });
      return api.fulfillWithValue(payload);
    } catch (error) {
      // return api.rejectWithValue(error);
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
