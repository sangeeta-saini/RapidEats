import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./menu.css";
import Rating from "./../../assets/rating.png";
import AddToBagButton from "./addButton";

function Menu() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/restaurants/${id}/menu`
        );
        const data = await res.json();
        console.log("Fetched menu data:", data);

        // 👇 convert to array if it's not already
        if (Array.isArray(data)) {
          setMenu(data);
        } else if (typeof data === "object" && data !== null) {
          setMenu(Object.values(data));
        } else {
          setMenu([]);
        }
      } catch (err) {
        console.error("Error fetching menu:", err.message);
        setError("Unable to load menu.");
      }
    };

    fetchMenu();
  }, [id]);

  return (
    <div className="menu-page">
      <h2 className="menu-head"> Menu</h2>
      {error && <p className="error">{error}</p>}

      <div className="menu-cards">
        {Array.isArray(menu) &&
          menu.map((item, index) => (
            <div className="menu-parent" key={item._id || item.id || index}>
              <div className="menu-card">
                <div>
                  <h3 className="menu-name">{item.name}</h3>
                  <h3 className="menu-price">₹ {item.price}</h3>
                  <div className="ratings">
                    <img className="rating-img" src={Rating} alt="star" />
                    <h3 className="menu-rating">{item.rating}</h3>
                  </div>

                  <h3 className="menu-description">{item.description}</h3>
                </div>
                <div className="img-btn">
                  <img
                    className="menu-image"
                    src={item.image}
                    alt={item.name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                  />
                  <div className="btn-container">
                    <AddToBagButton product={item} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Menu;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./menu.css";

// function Menu() {
//   const { id } = useParams();
//   const [menu, setMenu] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const result = await fetch(
//           `http://localhost:8080/api/restaurants/${id}/menu`
//         );

//         const data = await result.json();
//         console.log("Fetched menu data:", data);
//         setMenu(data.menu);
//       } catch (error) {
//         console.log("Failed to fetch menu:", error.message);
//       }
//     };

//     fetchMenu();
//   }, [id]);

//   return (
//     <div className="menu-page">
//       <h2>Restaurant Menu</h2>
//       {error && <p className="error">{error}</p>}
//       <div className="menu-cards">
//         {Array.isArray(menu) && menu.length > 0 ? (
//           menu.map((item) => (
//             <div className="menu" key={item.id}>
//               <img className="menu-image" src={item.image} alt={item.name} />
//               <h3 className="menu-name">{item.name}</h3>
//               <h3 className="menu-price">₹{item.price}</h3>
//             </div>
//           ))
//         ) : (
//           <p>No menu items found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// //   return (
// //     <div className="menu-container">
// //       <h3>MENU</h3>
// //       <div className="menu-cards">
// //         {Array.isArray(menu) &&
// //           menu.map((item) => (
// //             <div className="menu" key={item.id}>
// //               <img className="menu-image" src={item.image} alt={item.name} />
// //               <h3 className="menu-name">{item.name}</h3>
// //               <h4 className="menu-price">₹{item.price}</h4>
// //             </div>
// //           ))}
// //       </div>
// //     </div>
// //   );
// // }

// export default Menu;
