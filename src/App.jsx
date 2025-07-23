import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./Components/ProtectedRoutes.jsx";
import { useState, useEffect } from "react";

import NavBar from "./Components/NavBar";
import Login from "./Pages/Signup/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";

import Cart from "./Pages/Cart/Cart.jsx";
import Home from "./Pages/Home/Home.jsx";
import Menu from "./Pages/Menu/menu.jsx";

function App() {
  // const [userId, setUserId] = useState(() => localStorage.getItem("user_id"));

  // useEffect(() => {
  //   if (userId) localStorage.setItem("user_id", userId);
  //   else localStorage.removeItem("user_id");
  // }, [userId]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant/:id" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
