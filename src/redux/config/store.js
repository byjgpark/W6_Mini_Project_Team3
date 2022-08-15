import { configureStore } from "@reduxjs/toolkit";
import posts from "../modules/postSlice";
import post from "../modules/targetPostSlice";
import comments from "../modules/commentSlice";

const store = configureStore({
  reducer: {
    posts,
    post,
    comments,
  },
});

export default store;
