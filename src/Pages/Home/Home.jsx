import React from "react";
import "./home.css";
import BannerCarousel from "./bannerCarousel";
import Restaurants from "./restaurents.jsx";

function Home() {
  return (
    <>
      <div className="home-container">
        <BannerCarousel />
        <Restaurants />
      </div>
    </>
  );
}

export default Home;
