import React, { useState } from "react";
import "./sign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const validateForm = () => {
    let newError = {};

    if (!name) newError.name = "Name is required.";
    if (!email) newError.email = "Email is required.";
    else if (!validateEmail(email)) newError.email = "Invalid email format.";
    if (!password) newError.password = "Password is required.";
    else if (password.length < 7)
      newError.password = "Password must be atleast 7 charachters.";

    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const result = await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });

      // toast.success("Signed up successfully!");
      console.log(result.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
      // toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sign-box">
        <div className="sign-container">
          <div className="heading">Sign-Up</div>
          <div className="sign-name">
            <label className="name" htmlFor="name">
              Name:
            </label>
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && <div className="error">{error.name}</div>}
          </div>
          <div className="sign-email">
            <label className="name" htmlFor="email">
              Email:
            </label>
            <input
              className="input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <div className="error">{error.email}</div>}
          </div>
          <div className="sign-pass">
            <label className="name" htmlFor="password">
              Password:
            </label>
            <input
              className="input"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <div className="error">{error.password}</div>}
          </div>
          <div>
            {/* <Toaster position="top-center" reverseOrder={false} /> */}
            <button className="sign-btn" type="submit">
              Sign-Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
