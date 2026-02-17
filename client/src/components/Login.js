import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Dummy Users (Replace later with backend)
  const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "student", password: "123", role: "student" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // Save login info
      localStorage.setItem("userRole", foundUser.role);
      localStorage.setItem("username", foundUser.username);

      // Navigate based on role
if (foundUser.role === "admin") {
  window.location.href = "/dashboard";
} else {
  window.location.href = "/student-dashboard";
}

    } else {
      alert("Invalid Username or Password");
    }
  };

  // 🌐 Google Login (Default as Student)
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Token:", credentialResponse);

    localStorage.setItem("userRole", "student");
    localStorage.setItem("username", "Google User");

  window.location.href = "/student-dashboard";

  };

  const handleGoogleError = () => {
    alert("Google Sign In Failed");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Exam Schedule App</h2>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn">Login</button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
