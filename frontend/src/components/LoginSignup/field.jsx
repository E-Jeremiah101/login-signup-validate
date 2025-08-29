import './homelogin.css';
import React, { useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
const MainPage = () => {
  const {user, logout} = useAuthStore()

  const navigate = useNavigate();

  const handleLogout = async () => {
      const {message} = await logout();

      toast.success(message)

      
    }
  navigate("/");
  return (
    <>
      <div className="contain-main">
        <div>
          <h1 className="Best-place">Welcome <span className='user-name'>{user.userName} </span></h1>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default MainPage