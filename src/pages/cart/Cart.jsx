import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faBan} from '@fortawesome/free-solid-svg-icons'
import CartNavbar from "../../components/cartNavbar/CartNavbar";
import CartFooter from "../../components/CartFooter/CartFooter";
const Cart = () => {
  const { cartItems, item_list, removeFromCart, getTotalCartAmount, url, getCartItemCount} = useContext(StoreContext);
  const navigate = useNavigate()

  
  const [isCartEmpty, setIsCartEmpty] = useState(Object.keys(cartItems).length === 0);

  useEffect(() => {
    setIsCartEmpty(Object.values(cartItems).every(count => count === 0));
  }, [cartItems]);

  return (
    <>
    <CartNavbar/>
    {
      isCartEmpty ?
      <>
      <h2 className="empty-cart-text">You have no items in your cart</h2>
      <div className="empty-cart-container">
        <FontAwesomeIcon icon={faCartShopping}  style={{color: "#666",}} className="cart-icon"/>
        <FontAwesomeIcon icon={faBan}  style={{color: "red",}} className="ban-icon"/>
      </div>
      <h2 className="empty-cart-text-2">Add some items to view them</h2>
      </>

      :
      
      <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {item_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} />
                  <p>{item.name}</p>
                  <p>GH₵{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>GH₵{item.price * cartItems[item._id]}</p>
                  <p onClick={()=> removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>GH₵{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>GH₵{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>GH₵{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
         <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
            </div>
          </div>
         </div>
      </div>
    </div>
        }
          </>
  );
};

export default Cart;
