import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
};

export const addCommentThunk = createAsyncThunk(
  "postComment",
  async (payload, api) => {
    try {
      const data = await axios.post("http://localhost:3001/comments", payload);
      return api.fulfillWithValue(data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
export const editCommentThunk = createAsyncThunk(
  "editComment",
  async (payload, api) => {
    try {
      axios.patch(`http://localhost:3001/comments/${payload.id}`, payload);
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
      axios.patch(`http://localhost:3001/comments/${payload.id}`, payload);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
export const delCommentThunk = createAsyncThunk(
  "delComment",
  async (payload, api) => {
    try {
      axios.delete(`http://localhost:3001/comments/${payload}`);
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
