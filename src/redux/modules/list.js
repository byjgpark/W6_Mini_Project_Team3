import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const _getPost = createAsyncThunk("post/getPost", async (payload) => {
  // console.log(payload)
  const response = await axios.get("http://13.124.123.173/api/cards");
  console.log(response.data.data);
  return response.data.data;
});

const initialState = {
  postList: [
    // {
    //   id:0,
    //   image: "https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_1280.jpg",
    //   title:'제목제목제목',
    //   body: '바디입니다',
    //   star: 5,
    // },
    // {
    //   id:2,
    //   image:'https://cdn.pixabay.com/photo/2016/11/29/01/10/kitten-1866475_1280.jpg',
    //   title:'제목2',
    //   body: '바디2입니다',
    //   star: 4,
    // },
  ],
};

const postList = createSlice({
  name: "postList",
  initialState,
  reducers: {
    // getPost: (state, action) => {
    //   state.postList = action.payload
    // }
  },
  extraReducers: {
    [_getPost.fulfilled]: (state, action) => {
      state.postList = action.payload;
    },
  },
});

export const { getPost } = postList.actions;

export default postList.reducer;
