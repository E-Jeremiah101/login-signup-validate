import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { checkRequired, checkLength, checkEmail } from "./Login.js";
import './LoginSignup.css'

export default function LoginSignup ({ action: initialAction}) {
const location = useLocation();
  const [action, setAction ] = useState(initialAction||"Sign Up");

  
  useEffect(() => {
    document.body.style.backgroundImage =
      "url('./src/components/Assets/images/young-woman-having-face-massage-relaxing-spa-salon_176420-7546.avif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "contain";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);



  const [formData, setFormData] = useState({
  fullName: "",
  userName: "",
  email: "",
  password: "",
});

const [errors, setErrors] = useState({});
const [success, setSuccess] = useState({});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value.trim(),
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  let newErrors = {};

  if (action === "Sign Up") {
    // Full Name
    let fullNameRequired = checkRequired(formData.fullName, "Full Name");
    if (fullNameRequired) newErrors.fullName = fullNameRequired;

    // Username
    let userNameRequired = checkRequired(formData.userName, "Username");
    if (userNameRequired) newErrors.userName = userNameRequired;

    // Email
    let emailRequired = checkRequired(formData.email, "Email");
    if (emailRequired) {
      newErrors.email = emailRequired;
    } else {
      let emailValid = checkEmail(formData.email);
      if (emailValid) newErrors.email = emailValid;
    }

    // Password
    let passwordRequired = checkRequired(formData.password, "Password");
    if (passwordRequired) {
      newErrors.password = passwordRequired;
    } else {
      let passwordLength = checkLength(formData.password, 6, 25, "Password");
      if (passwordLength) newErrors.password = passwordLength;
    }
  }

  

  setErrors(newErrors);
  setSuccess({
    fullName: !newErrors.fullName,
    userName: !newErrors.userName,
    email: !newErrors.email,
    password: !newErrors.password,
  });

  if (Object.keys(newErrors).length === 0) {
    alert(`${action} successful!`);
    console.log("Form Data:", formData);
  }
}
return (
  
  <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="header">
        {action === "Sign Up" ? <div></div> : <h1>Welcome back</h1>}
        {action === "Login" ? <div></div> : <h1>Become a Member</h1>}

        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <>
            <div
              className={`form-control ${
                success.fullName ? "success" : errors.fullName ? "error" : ""
              }`}
            >
              <div className="input">
                <i className="bi bi-people-fill"></i>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Fullname"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <small>{errors.fullName}</small>
              </div>
            </div>
            <div
              className={`form-control ${
                success.userName ? "success" : errors.userName ? "error" : ""
              }`}
            >
              <div className="input">
                <i className="bi bi-person-fill"></i>
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                />
                <small>{errors.userName}</small>
              </div>
            </div>
          </>
        )}
        <div
          className={`form-control ${
            success.email ? "success" : errors.email ? "error" : ""
          }`}
        >
          <div className="input">
            <i className="bi bi-envelope-at-fill"></i>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <small>{errors.email}</small>
          </div>
        </div>
        <div
          className={`form-control ${
            success.password ? "success" : errors.password ? "error" : ""
          }`}
        >
          <div className="input">
            <i className="bi bi-lock-fill"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <small>{errors.password}</small>
          </div>
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here</span>
        </div>
      )}

      <div className="submit-container"></div>
      <button type="submit" className="submit mainsubmit">
        {action}
      </button>

      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div
          type="button"
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Don't have an account? <span> Sign Up</span>
        </div>
      )}

      {action === "Login" ? (
        <div></div>
      ) : (
        <div
          type="button"
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Already have an account? <span>Login</span>
        </div>
      )}
    </form>
  </div>
);
}

