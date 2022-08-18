import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
    console.log(JSON.stringify(payload)); //cardId
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
//댓글 수정 /api/auth/comments/{id} /api/auth/cards/comments/{id}
export const editCommentThunk = createAsyncThunk(
  "editComment",
  async (payload, api) => {
    console.log(JSON.stringify(payload));
    try {
      const data = await instance.put(`api/auth/cards/comments/${payload.id}`, {
        nickname:payload.nickname,
        content: payload.content,  
        isEditMode: true,
      },{data:{data:{isEditMode: true,}}});
      console.log(data.data)
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);
//댓글 조회 //api/cards/{id}/comments
export const checkCommentThunk = createAsyncThunk(
  "checkComment",
  async (payload, api) => {
    console.log(payload)
    try {
      const data = await instance.get(`api/cards/${payload}/comments`);
      // return console.log(data.data.data);
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
    console.log(payload.id)
    try {
      await instance.delete(`api/auth/cards/comments/${payload.id}`);
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
    [delCommentThunk.fulfilled]: (state, action) => {
      const target = state.comments.filter((v) => v.id !== action.payload.id);
      state.comments = target;
      
      // state.comments.splice(target, 1);
      },
    [delCommentThunk.rejected]: () => {},
  },
});
export const {} = CommentSlice.actions;
export default CommentSlice.reducer;
