import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

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
    let newError = {};

    if (!validateEmail(email)) newError.email = "Invalid email format.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    try {
      const result = await axios.post("http://localhost:8080/user/", {
        email,
        password,
      });
      debugger;
      const userId = result.data._id;
      localStorage.setItem("user_id", userId);
      toast.success("Login successfully!");
      navigate("/home");
    } catch (error) {
      debugger;
      if (error.response && error.response.data.message) {
        const msg = error.response.data.message;
        if (msg.email) {
          setError({ email: msg.email });
        }
        if (msg.password) {
          setError({ password: msg.password });
        }
      } else {
        setError({ general: "Server error. Please try again later." });
        toast.error("Server error. Please try again later.");
      }
      toast.error(error.response?.data?.message || "User not found");
    }
  };
  console.log("Error State:", error);

  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} />; */}
      <form onSubmit={handleSubmit}>
        <div className="login-box">
          <div className="sign-container">
            <div>
              <h2 className="heading">Login</h2>
            </div>
            <div>
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
              {error.email && <div className="error">{error.email}</div>}

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
              {error.password && <div className="error">{error.password}</div>}
            </div>
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
