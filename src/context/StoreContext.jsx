import { createContext, useEffect, useState } from "react";
import { item_list } from "../assets/assets";
import { useActionData } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  
  // const url = "https://finafreightserver.onrender.com"
  const url = "http://localhost:4000";

  const [token, setToken] = useState("");
  const [item_list, setItemList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = item_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchItemList = async () => {
    const response = await axios.get(url + "/api/item/list");
    setItemList(response.data.data);
  };


  const loadCartData = async (token) => {
    console.log('Token:', token);
    const response = await axios.post(url +"/api/cart/get", {},{headers:{token}});
      console.log('Cart data response:', response);
    setCartItems(response.data.cartData);
  };


  const getCartItemCount = () => {
    let itemCount = 0;
    for (const item in cartItems) {
      itemCount += cartItems[item];
    }
    return itemCount;
  };
  


  useEffect(() => {
    async function loadData() {
      await fetchItemList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));

      }
    }
    loadData();
  }, []);

  const contextValue = {
    item_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getCartItemCount,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
