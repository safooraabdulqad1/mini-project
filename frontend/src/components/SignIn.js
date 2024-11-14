import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Allstyles/Auth.css";
import { Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );
      const { token, userEmail } = response.data;
      console.log(token + userEmail);
      login({ token, email: email });

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Store user info in localStorage or context if needed
      localStorage.setItem("email", JSON.stringify(userEmail));
      localStorage.setItem("isLoggedIn", true);
      // Redirect to dashboard or home page
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "An error occurred during sign in"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSignIn} className="auth-form">
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
          {isLoading ? <Spinner animation="border" size="sm" /> : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
