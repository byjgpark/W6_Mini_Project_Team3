import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

const initialState = {
  comments: [],
};

//코멘트 작성 /api/auth/comments
export const addCommentThunk = createAsyncThunk(
  "postComment",
  async (payload, api) => {
    try {
      const { data } = await instance.post("/api/auth/comments");
      return api.fulfillWithValue(data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
//댓글 수정 /api/auth/comments/{id}
export const editCommentThunk = createAsyncThunk(
  "editComment",
  async (payload, api) => {
    try {
      await instance.patch(`/api/auth/comments/${payload.id}`, {
        content: payload.content,
      });
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

export const checkCommentThunk = createAsyncThunk(
  "checkComment",
  async (payload, api) => {
    try {
      axios.patch(`/api/auth/comments/${payload.id}`, payload);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
// 댓글 삭제 api/auth/comments/{id}
export const delCommentThunk = createAsyncThunk(
  "delComment",
  async (payload, api) => {
    try {
      await instance.delete(`/api/auth/comments/${payload}`);
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
    [addCommentThunk.fulfilled]: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
    [addCommentThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [editCommentThunk.fulfilled]: (state, action) => {
      state.comments.map((comments) => {
        if (comments.id == action.payload.id) {
          comments.content = action.payload.content;
        }
        return comments;
      });
    },
    [editCommentThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [checkCommentThunk.fulfilled]: (state, action) => {
      state.comments.map((comments) => {
        if (comments.id == action.payload.id) {
          comments.isEditMode = !comments.isEditMode;
        }
        return comments;
      });
    },
    [checkCommentThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [delCommentThunk.fulfilled]: (state, action) => {
      const target = state.comments.findIndex(
        (comments) => comments.id === action.payload
      );

      state.comments.splice(target, 1);
    },
    [delCommentThunk.rejected]: () => {},
  },
});
export const {} = CommentSlice.actions;
export default CommentSlice.reducer;
