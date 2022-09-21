import React from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/add/Add";
import Detail from "./pages/detail/Detail";
import ListPage from "./pages/list/ListPage";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import SignUp from "./pages/signUp/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/add" element={<Add />} />
      <Route path="/Detail/:id" element={<Detail />} />
      <Route path="/cards" element={<ListPage />} />
      <Route path="/cards/:id" element={<ListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
