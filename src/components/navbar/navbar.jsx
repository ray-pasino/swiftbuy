import React, { useContext, useEffect } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin, menu, setMenu }) => {

  const { getTotalCartAmount, token, setToken, getCartItemCount} = useContext(StoreContext);

  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }


  const itemCount = getCartItemCount();


  return (
    <div className="navbar" id="navbar">
      <Link to="/">
        <img src={assets.logo} alt="swiftbuylogo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-categories"
          onClick={() => setMenu("categories")}
          className={menu === "categories" ? "active" : ""}
        >
          categories
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        {/* <Link to='/search'>
        <img src={assets.search_icon} alt="search_icon" />
        </Link> */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              size="xl"
              style={{ color: "#49557e" }}
            />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
            <div className="count">
            {itemCount ? itemCount : ''}
            </div>
            </div>
        </div>
        {!token ? (
          <>
            <button onClick={() => setShowLogin(true)}>sign in</button>
            <FontAwesomeIcon
              onClick={() => setShowLogin(true)}
              icon={faUser}
              size="xl"
              style={{ color: "#49557e", cursor:"pointer" }}
              className="user-icon"
            />
          </>
        ) : (
          <Link to='/profile'>
          <div className="navbar-profile">
            <FontAwesomeIcon
              icon={faUserRegular}
              size="xl"
              style={{ color: "#49557e", cursor:"pointer"}}
            />
          </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
