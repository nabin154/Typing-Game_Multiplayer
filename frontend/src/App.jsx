import { useState } from "react";
import "./App.css";
import {Routes, Route , BrowserRouter}  from 'react-router-dom';
import LoginSignupPage from "./pages/Authentication/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/navbar/Navbar";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginSignupPage />} />
          <Route path={"/home"} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
