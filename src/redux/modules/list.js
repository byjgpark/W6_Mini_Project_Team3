import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "./instance";

const ageParams = ['10', '20', '30']
export const _getPost = createAsyncThunk(
  "post/getPost",
  async () => {
    try{
    // console.log(param)

    // const pram = await useParams()
    const response = await instance.get('/api/cards')
    const data = response.data.data
    console.log(data)
    // console.log(params)

     return data
   }catch(error){
    console.log(error)
   }
  }
)

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
      state.postList = action.payload
      console.log(action)
    }
  }
})

export const { getPost } = postList.actions;

export default postList.reducer;
