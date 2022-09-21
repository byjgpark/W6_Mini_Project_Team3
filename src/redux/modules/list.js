import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./instance";

export const _getPost = createAsyncThunk("post/getPost", async () => {
  try {
    const response = await instance.get("/api/cards");
    const data = response.data.data;

    return data;
  } catch (error) {
  }
});

const initialState = {
  postList: [],
};

const postList = createSlice({
  name: "postList",
  initialState,
  reducers: {},
  extraReducers: {
    [_getPost.fulfilled]: (state, action) => {
      state.postList = action.payload;
    },
  },
});

export const { getPost } = postList.actions;

export default postList.reducer;
