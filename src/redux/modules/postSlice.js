import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import instance from "./instance";
=======
import axios from "axios";
import instance from "./instans";
>>>>>>> 388d16617d4f8ab68b43e4c7155e22b3f3470bb9

const initialState = {
  posts: [],
};

const headers = {
  "Content-Type": "multipart/form-data",
};

//게시물 추가 /api/auth/cards
export const addDetailThunk = createAsyncThunk(
  "postDetail",
  async (payload, api) => {
    console.log(payload);
    const token = window.localStorage.getItem('SavedToken')
    console.log(token)
    try {
<<<<<<< HEAD
      const data = await instance.post("/api/auth/cards", payload, {
        headers: headers,
        // "Content-Type": "multipart/form-data",
      });
      console.log(data);
      return api.fulfillWithValue(data.data);
=======
      // const data = await axios.post("http://13.124.123.173/api/auth/cards", payload);
      // console.log(data);
      // return api.fulfillWithValue(data.data);

      //----------------------테스트--------------------//
      // axios.defaults.headers.common['Authorization'] = {token}
      instance.post('/api/auth/cards', payload)
      .then(res => {
        console.log(res);	
      })

      // axios.post(process.env.REACT_APP_API_KEY+'/api/auth/cards', payload, {headers:{Authorization: localStorage.getItem('SavedToken')}})
      // .then(res => {
      //   console.log(res);	
      // })
      //---------------------------테스트 끝-----------------//
>>>>>>> 388d16617d4f8ab68b43e4c7155e22b3f3470bb9
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
      state.posts = action.payload;
    },
    [addDetailThunk.rejected]: (state, action) => {
<<<<<<< HEAD
      console.log(state);
      state.posts = action.payload;
    },
    [deleteDetailThunk.fulfilled]: (state, action) => {
      state.posts = state.filter((posts) => posts.id !== action.payload.id);
    },
    [deleteDetailThunk.rejected]: (state, action) => {
      console.log(state);
      state.posts = action.payload;
=======
      console.log(action.payload);
      state.postings = action.payload;
>>>>>>> 388d16617d4f8ab68b43e4c7155e22b3f3470bb9
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
