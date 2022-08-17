import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

const initialState = {
  postings: [],
};

//게시물 추가
export const addDetailThunk = createAsyncThunk(
  "postDetail",
  async (payload, api) => {
    // console.log(payload);
    try {
      const { data } = await instance.post("/api/auth/cards", payload, {
        "Content-Type": "multipart/form-data",
      });
      return api.fulfillWithValue(data.data);
    } catch (error) {
      return api.rejectWithValue(error);
    }
  }
);
//게시물 삭제 /api/auth/cards/{id}
export const deleteDetailThunk = createAsyncThunk(
  "deleteDetail",
  async (payload, api) => {
    console.log(payload);
    try {
      await instance.delete(`api/auth/cards/${payload.id}`);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
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
    [deleteDetailThunk.fulfilled]: (state, action) => {
      state.postings = state.filter(
        (posting) => posting.id !== action.payload.id
      );
    },
    [deleteDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.postings = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
