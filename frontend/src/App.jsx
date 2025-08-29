import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Homelogin from './components/LoginSignup/Homelogin';
import MainPage from './components/LoginSignup/field'
import LoginSignup from './components/LoginSignup/LoginSignup';
import ErrorBoundary from './components/LoginSignup/errorboundary';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';


function App() {
  const {fetchUser, fetchingUser} = useAuthStore()

  useEffect(() => {
    fetchUser();
  }, [fetchUser])

  if(fetchingUser){
    return <p>Loading...</p>
  }
  return (
    <ErrorBoundary>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Homelogin />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/signup" element={<LoginSignup action="Sign Up" />} />
        <Route path="/login" element={<LoginSignup action="Login" />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App
