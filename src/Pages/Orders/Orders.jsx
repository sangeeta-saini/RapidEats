import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.get("http://localhost:8080/order/", {
        headers: { user_id: userId },
      });
      console.log("Orders response:", response.data);
      setOrders(response.data.orders || []);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Could not load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-head">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="nodata-imgs">
          <img
            className="no-data"
            src="/assets/nodata.png"
            alt="No Data Found"
          />
          <p className="empty">No orders found!</p>
        </div>
      ) : (
        <div className="orders-container-2">
          {orders.map((order) => (
            <div key={order._id} className="order-container-3">
              <div className="order-details">
                <div className="order-box-1">
                  <div className="order-status">
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </div>
                  <h3 className="order-id">
                    <strong>Order ID #</strong> {order._id}
                  </h3>
                </div>
                <div className="order-box-2">
                  <div className="order-payment">
                    <strong>Payment Mode:</strong> {order.paymentMethod}
                  </div>
                  <div className="order-date">
                    <strong>Placed On:</strong>{" "}
                    {new Date(order.orderDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="order-shipping">
                  <strong className="shipping-head">Shipping To:</strong>
                  <div>{order.shippingAddress}</div>
                </div>
              </div>

              <h4 className="order-item-head">Items:</h4>
              <div className="order-item-box-1">
                <div className="order-item-box">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="all-orders">
                        <img
                          className="order-img"
                          src={item.images && item.images[0]}
                          alt={item.name}
                        />
                        <div>
                          <strong className="order-name">{item.name}</strong>
                        </div>
                        <div className="order-price">
                          ₹{item.price.toFixed(2)}
                        </div>
                        <div className="order-quentity">
                          Quantity {item.quantity}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No items found in this order.</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
