import './homelogin.css';
import React, { useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
const Homelogin = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
      //  document.body.style.backgroundImage =
      //    "url('./src/components/Assets/images/attractive-african-woman-having-massage-relaxing-spa-salon-closed-eyes_176420-13927.avif')";
       document.body.style.backgroundSize = "cover";
       document.body.style.backgroundRepeat = "no-repeat";
       document.body.style.backgroundPosition = "center";
       document.body.style.height = "100vh";
       document.body.style.display = "flex";
       document.body.style.alignItems = "center";

      return () => {
        document.body.style.backgroundImage = "";
      };
    }, []);
  return (
    
    <div className="contain-main">
      <div>
        <h1 className='Best-place'>Best Place for Your SPA Experience </h1>
      </div>

      <div className="btn-div">
        {/* Go to signup page */}
        <button onClick={() => navigate("/signup")}>Signup</button>

        {/* Go to login page */}
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
}

export default Homelogin