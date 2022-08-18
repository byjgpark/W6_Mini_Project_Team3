import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

const initialState = {
  posts: [],
};

// const headers = {
//   "Content-Type": "multipart/form-data",
// };

//게시물 추가 /api/auth/cards
export const addDetailThunk = createAsyncThunk(
  "postDetail",
  async (payload, api) => {
    console.log(payload);
    const token = window.localStorage.getItem("SavedToken");
    console.log(token);
    try {
      const data = await instance.post("/api/auth/cards", payload);
      console.log(data);
      return api.fulfillWithValue(data.data.data);
    } catch (error) {
      return api.rejectWithValue(error);
    }
  }
);
//게시물 삭제 /api/auth/cards/{id} /api/auth/cards/{id}
export const deleteDetailThunk = createAsyncThunk(
  "deleteDetail",
  async (payload, api) => {
    console.log(payload);
    try {
      await instance.delete(`api/auth/cards/${payload}`);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [addDetailThunk.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [addDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.posts = action.payload;
    },
    [deleteDetailThunk.fulfilled]: (state, action) => {
      state.posts = state.filter((b) => b.id !== action.payload.id);
    },
    [deleteDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.posts = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
