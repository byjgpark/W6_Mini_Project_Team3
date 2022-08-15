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
      <Route path="/detail" element={<Detail />} />
      <Route path="/listPage" element={<ListPage />} />
      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
