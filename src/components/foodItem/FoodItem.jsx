import React, { useContext} from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";

const FoodItem = ({ id, name, description, image, price }) => {
  const { cartItems, addItemToCart, removeItemFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt="food-item-image"
        />
        {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            alt="add"
            onClick={() => addItemToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeItemFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addItemToCart(id)}
              src={assets.add_icon_green}
              alt="added"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;