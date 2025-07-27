import React, { useEffect, useState } from "react";
import "./cart.css";
import Address from "./address.jsx";

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const DELIVERY_FEE = 97;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          console.error("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const [addressRes, cartRes] = await Promise.all([
          fetch("http://localhost:8080/address/add", {
            headers: { user_id: userId },
          }),
          fetch("http://localhost:8080/cart/", {
            headers: { user_id: userId },
          }),
        ]);

        const userData = await userRes.json();
        const addressData = await addressRes.json();
        const cartData = await cartRes.json();

        setUser(userData);
        setAddress(addressData);
        setCart(cartData.items || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getItemTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getGST = (amount) => (amount * 0.08).toFixed(2);
  const totalAmount =
    getItemTotal() + DELIVERY_FEE + parseFloat(getGST(getItemTotal()));

  if (loading) return <p>Loading...</p>;

  return (
    <div className="cart-container">
      <Address />

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="cart-section">
          <h4>🛒 Your Cart</h4>
          <div className="restaurant-header">
            <img
              src={cart[0].restaurantImage}
              alt=""
              className="restaurant-image"
            />
            <div>
              <h3>{cart[0].restaurantName}</h3>
              <small>{cart[0].restaurantLocation}</small>
            </div>
          </div>
          {cart.map((item, idx) => (
            <div key={idx} className="dish-row">
              <span>{item.name}</span>
              <div className="qty-price">
                <span>Qty: {item.quantity}</span>
                <span>₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bill Details */}
      <div className="cart-section">
        <h4>Bill Details</h4>
        <div className="bill-row">
          <span>Item Total</span>
          <span>₹{getItemTotal()}</span>
        </div>
        <div className="bill-row">
          <span>Delivery Fee</span>
          <span>₹{DELIVERY_FEE}</span>
        </div>
        <div className="bill-row">
          <span>GST & Charges</span>
          <span>₹{getGST(getItemTotal())}</span>
        </div>
        <hr />
        <div className="bill-row total">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
