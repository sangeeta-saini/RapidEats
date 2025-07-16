import React, { useEffect, useState } from "react";
import "./banner.css";

const banners = [
  {
    image: "/banner/banner1.png",
    alt: "Banner1",
  },
  {
    image: "/banner/banner2.png",
    alt: "Banner2",
  },
  {
    image: "/banner/banner3.png",
    alt: "Banner3",
  },
  {
    image: "/banner/banner4.png",
    alt: "Banner4",
  },
  {
    image: "/banner/banner5.png",
    alt: "Banner5",
  },
];

function bannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="slider-container">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <div className="slide" key={index}>
            <img src={banner.image} alt={banner.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default bannerCarousel;
