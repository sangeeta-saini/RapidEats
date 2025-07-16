import React, { useEffect, useState } from "react";
import "./restaurants.css";
import Rating from "./../../assets/rating.png";
import { useNavigate } from "react-router-dom";

function Restaurents() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const result = await fetch("http://localhost:8080/api/restaurants");
        if (!result.ok) {
          throw new error("Failed to fetch restaurants");
        }

        const data = await result.json();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="card-container">
      <h2 className="rest-heading">All Restaurants</h2>
      {error && <h4>{error}</h4>}

      <div className="card-parent">
        {restaurants.map((rest) => (
          <div
            className="card"
            key={rest._id}
            onClick={() => navigate(`/restaurant/${rest._id}`)}
          >
            <img className="card-img" src={rest.image} alt={rest.name} />
            <h3 className="card-name">{rest.name}</h3>

            <h3 className="card-location">{rest.location}</h3>
            <div className="rating">
              <img className="rating-img" src={Rating} alt="star" />
              <h3 className="card-rating">{rest.rating}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Restaurents;
