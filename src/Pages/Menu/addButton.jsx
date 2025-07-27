import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddToBagButton = ({ product }) => {
  const navigate = useNavigate();

  const notify = () => toast("Product is added to Bag");
  const showSignUpToast = () => toast.error("Please sign up first");

  const handleAddToBag = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      showSignUpToast();
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/cart/",
        {
          userId: userId,
          dishId: product._id, // ✅ pass _id of the dish
        },
        {
          headers: {
            "Content-Type": "application/json", // ✅ recommended
          },
        }
      );
      notify();
    } catch (err) {
      console.error("Error adding to bag:", err);
      toast.error("Failed to add product to Bag");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      <button onClick={handleAddToBag} className="add-btn">
        Add
      </button>
    </>
  );
};

export default AddToBagButton;
