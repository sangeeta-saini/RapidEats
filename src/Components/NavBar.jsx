import React from "react";
import "./navbar.css";
import SearchSVG from "./../assets/search.svg";
import WishlistSVG from "./../assets/wishlist.svg";
import CartSVG from "./../assets/cart.svg";
import Logo from "./../assets/Logo.png";

function NavBar() {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-box">
          <div className="nav-logo">
            <img className="logo" src={Logo} />
          </div>
          <div className="list-items">
            <ul className="list">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="dishes">Dishes</a>
              </li>
              <li>
                <a href="orders">Orders</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="search-conatiner">
            <div className="search-bar">
              <img className="search-icon" src={SearchSVG} />
              <input
                className="search-input"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>

          <div className="container-3">
            <div className="sign-up">
              <a href="/login">Signup</a>
            </div>

            <div className="cart">
              <a href="cart">
                <img className="cart" src={CartSVG} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
