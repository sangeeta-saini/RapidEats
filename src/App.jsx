import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoutes.jsx";

import NavBar from "./Components/NavBar";
import Login from "./Pages/Signup/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";

import Cart from "./Pages/Cart.jsx";
import Home from "./Pages/Home/Home.jsx";
import Menu from "./Pages/Menu/menu.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant/:id" element={<Menu />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
