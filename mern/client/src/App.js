import React from 'react'
import {Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

import './App.css'

const App = () => {
  return (
   <>
     <Navbar/>

   <Routes>  
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />

    </Routes>

     
   </>
  )
}

export default App;
