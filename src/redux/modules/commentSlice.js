import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

const initialState = {
  comments: [],
};

const headers = {
  "Content-Type": "multipart/form-data",
};

//코멘트 작성 /api/auth/cards/{id}/comments
export const addCommentThunk = createAsyncThunk(
  "postComment",
  async (payload, api) => {
    try {
      const { data } = await instance.post(
        `/api/auth/cards/${payload.cardId}/comments`,
        payload,
        // {headers: headers,}
      );
      return api.fulfillWithValue(data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

//댓글 조회 //api/cards/{id}/comments
export const checkCommentThunk = createAsyncThunk(
  "checkComment",
  async (payload, api) => {
    try {
      const data = await instance.get(`/api/cards/${payload}/comments`);
      return api.fulfillWithValue(data.data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
// 댓글 삭제 api/auth/comments/{id}  /api/auth/cards/comments/{id}
export const delCommentThunk = createAsyncThunk(
  "delComment",
  async (payload, api) => {
    try {
      await instance.delete(`/api/auth/cards/comments/${payload.id}`);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

export const CommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [checkCommentThunk.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [checkCommentThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [addCommentThunk.fulfilled]: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
    [addCommentThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [delCommentThunk.fulfilled]: (state, action) => {
      const target = state.comments.filter((v) => v.id !== action.payload.id);
      state.comments = target;
    },
    [delCommentThunk.rejected]: () => {},
  },
});
export const {} = CommentSlice.actions;
export default CommentSlice.reducer;
