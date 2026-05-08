import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, food_list, removeItemFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const cartTotal = getTotalCartAmount();
  const cartFoods = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="cart">
      <div className="cart-items">
        {cartFoods.length ? (
          <>
            <div className="cart-items-title">
              <p>items</p>
              <p>title</p>
              <p>price</p>
              <p>quantity</p>
              <p>total</p>
              <p>remove</p>
            </div>
            <br />
            <hr />
            {cartFoods.map((item) => (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button
                    className="cross"
                    type="button"
                    onClick={() => removeItemFromCart(item._id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    x
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </>
        ) : (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Add a few dishes from the menu before checkout.</p>
            <button type="button" onClick={() => navigate("/")}>
              Browse menu
            </button>
          </div>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${cartTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${cartTotal === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${cartTotal === 0 ? 0 : cartTotal + 2}
              </b>
            </div>
          </div>
          <button disabled={cartTotal === 0} onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
