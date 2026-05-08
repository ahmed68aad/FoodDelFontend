import { useContext } from "react";
import "./FoodDiplay.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import FoodItem from "../foodItem/FoodItem";

const FoodDiplay = ({ category }) => {
  const { food_list = [], loadingFoods } = useContext(StoreContext);
  const visibleFoods = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {loadingFoods ? (
          <p className="food-display-message">Loading dishes...</p>
        ) : visibleFoods.length ? (
          visibleFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              description={item.description}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="food-display-message">
            No dishes found in this category yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodDiplay;
