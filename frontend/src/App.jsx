import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Homelogin from './components/LoginSignup/Homelogin';import LoginSignup from './components/LoginSignup/LoginSignup';


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Homelogin />} />
      <Route path="/signup" element={<LoginSignup action="Sign Up" />} />
      <Route path="/login" element={<LoginSignup action="Login" />} />
    </Routes>
  );
}

export default App
