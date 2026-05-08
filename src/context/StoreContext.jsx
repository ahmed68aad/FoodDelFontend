import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url =
    import.meta.env.VITE_API_URL ||
    "https://fooddelbackend-production-994e.up.railway.app";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);

  const addItemToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Add to cart failed:", error);
      }
    }
  };

  const removeItemFromCart = async (itemId) => {
    setCartItems((prev) => {
      const nextQuantity = Math.max((prev[itemId] || 0) - 1, 0);
      return { ...prev, [itemId]: nextQuantity };
    });
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Remove from cart failed:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFood_list = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFood_list(response.data.data || []);
    } catch (error) {
      console.error("Unable to load food list:", error);
      setFood_list([]);
    } finally {
      setLoadingFoods(false);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Unable to load cart:", error);
      setCartItems({});
    }
  };
  useEffect(() => {
    async function loadData() {
      await fetchFood_list();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadingFoods,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
