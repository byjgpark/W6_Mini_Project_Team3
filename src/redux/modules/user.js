import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getUsers = createAsyncThunk("GET_USERS", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API_KEY + "/users");
    return thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e.code);
  }
});


export const __addUser = createAsyncThunk(
  "ADD_USER",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_KEY + "/users", arg);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }

  }
);

export const __getCommnetsByTodoId = createAsyncThunk(
  "GET_COMMENT_BY_TODO_ID",
  async (arg, thunkAPI) => {
    try {

      const { data } = await axios.get(process.env.REACT_APP_API_KEY+`/comments?todoId=${arg}`

      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(process.env.REACT_APP_API_KEY + `/comments/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      axios.patch(process.env.REACT_APP_API_KEY + `/comments/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __loginUser = createAsyncThunk(
  "LOGIN_USER",
  async (arg, thunkAPI) => {
    try {
      axios.update("http://13.124.123.173/users/login", arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  users: {
    user: [],
    userStatus: false,
    isLoading: false,
    error: null,
  },
  //   commentsByTodoId: {
  //     data: [],
  //     isLoading: false,
  //     error: null,
  //   },
};

export const user = createSlice({
  name: "users",
  initialState,
  reducers: {
    userStatus: (state, action) => {

      state.users.userStatus = action.payload

    },
  },
  extraReducers: {
    // Query Entire User Info
    [__getUsers.pending]: (state) => {
      state.users.isLoading = true;
    },
    [__getUsers.fulfilled]: (state, action) => {
      state.users.isLoading = false;
      state.users.user = action.payload;
    },
    [__getUsers.rejected]: (state, action) => {
      state.users.isLoading = false;
      state.users.error = action.payload;
    },

    // Add User
    [__addUser.fulfilled]: (state, action) => {
      state.users.isLoading = false;

    },
    [__addUser.rejected]: (state, action) => {
      state.users.isLoading = false;
      state.users.error = action.payload;
    },
    [__addUser.pending]: (state) => {
      state.users.isLoading = true;
    },

    // ?????? ?????? (todoId)
    [__getCommnetsByTodoId.pending]: (state) => {

      state.commentsByTodoId.isLoading = true;
    },
    [__getCommnetsByTodoId.fulfilled]: (state, action) => {

      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.data = action.payload;
    },
    [__getCommnetsByTodoId.rejected]: (state, action) => {

      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },

    // ?????? ??????
    [__deleteComment.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByTodoId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },

    // ?????? ??????
    [__updateComment.pending]: (state) => {},
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.commentsByTodoId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: () => {},

    // ?????? ??????
    [__loginUser.pending]: (state) => {},
    [__loginUser.fulfilled]: (state, action) => {
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.commentsByTodoId.data.splice(target, 1, action.payload);
    },
    [__loginUser.rejected]: () => {},
  },
});

export const { userStatus } = user.actions;

export default user.reducer;
