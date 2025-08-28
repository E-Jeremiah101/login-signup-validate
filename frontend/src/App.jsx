import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Homelogin from './components/LoginSignup/Homelogin';import LoginSignup from './components/LoginSignup/LoginSignup';
import ErrorBoundary from './components/LoginSignup/errorboundary';


function App() {
  
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Homelogin />} />
        <Route path="/signup" element={<LoginSignup action="Sign Up" />} />
        <Route path="/login" element={<LoginSignup action="Login" />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App
