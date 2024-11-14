import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Allstyles/Auth.css";
import { Spinner, Alert } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      const { token, userEmail } = response.data;

      if (response.ok) {
        console.log("Signup successful:", data);
        localStorage.setItem("isLoggedIn");
        localStorage.setItem("token", token);

        // Store user info in localStorage or context if needed
        localStorage.setItem("email", JSON.stringify(userEmail));
        navigate("/");
        // Handle successful signup (e.g., redirect or show success message)
      } else {
        console.error("Signup failed:", data.error);
        // Handle signup error (e.g., show error message to user)
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleRegister} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
        </button>
      </form>
      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
