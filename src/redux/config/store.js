import { configureStore } from "@reduxjs/toolkit";

import posts from "../modules/postSlice";
import post from "../modules/targetPostSlice";
import comments from "../modules/commentSlice";
import user from "../modules/user";
import list from "../modules/list";

const store = configureStore({
  reducer: {
    posts,
    post,
    comments,
    user,
    list

  },
});

export default store;
