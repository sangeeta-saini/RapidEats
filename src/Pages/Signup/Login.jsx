import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const validateForm = () => {
    const newError = {};

    if (!validateEmail(email)) {
      newError.email = "Invalid email format.";
    }

    if (password.length < 6) {
      newError.password = "Password must be at least 6 characters.";
    }

    return newError; // ✅ IMPORTANT: return the error object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return; // 🛑 Stop submission if frontend validation fails
    }

    setError({}); // Clear any prior errors

    try {
      const result = await axios.post("http://localhost:8080/user/", {
        email,
        password,
      });

      const userId = result.data._id;
      localStorage.setItem("user_id", userId);
      navigate("/cart");
    } catch (err) {
      // You said no backend errors; only handle general failure
      setError({ general: "Something went wrong. Try again!" });
    }
  };

  // console.log("Error State:", error);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-box">
          <div className="sign-container">
            <h2 className="heading">Login</h2>
            <label className="name" htmlFor="email">
              Email:
            </label>
            <input
              className="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <div className="errors">{error.email}</div>}

            <label className="name" htmlFor="password">
              Password:
            </label>
            <input
              className="email"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <div className="errors">{error.password}</div>}

            {error.general && <div className="errors">{error.general}</div>}

            <div className="or-create">
              <h4 className="or">or</h4>
              <a href="/signup">
                <h4 className="create"> create an account</h4>
              </a>
            </div>

            <button className="sign-btn">LOGIN</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
