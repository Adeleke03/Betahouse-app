import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./auth/Login.jsx";
import SignUp from "./auth/Signup.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        {" "}
        <Routes>
          {" "}
          <Route
            element={
              <>
                {" "}
                <Layout />{" "}
              </>
            }
          > <Route path="/" element={<Home/>} /> 
          
          </Route>{" "}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>{" "}
      </BrowserRouter>
    </>
  );
}

export default App;
