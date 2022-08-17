import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instans";

const initialState = {
  postings: [],
};

export const addDetailThunk = createAsyncThunk(
  "postDetail",
  async (payload, api) => {
    console.log(payload);
    const token = window.localStorage.getItem('SavedToken')
    console.log(token)
    try {
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
    } catch (error) {
      return api.rejectWithValue(error);
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
      console.log(action.payload);
      state.postings = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
