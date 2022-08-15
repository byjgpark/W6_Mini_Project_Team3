import { configureStore } from "@reduxjs/toolkit";

import posts from "../modules/postSlice";
import post from "../modules/targetPostSlice";
import comments from "../modules/commentSlice";
import user from "../modules/user";
import post from "../modules/post";

const store = configureStore({
  reducer: {
    posts,
    post,
    comments,
    user,
    post

  },
});

export default store;
