import React, { useContext, useEffect } from "react";
import "./Profilenavbar.css";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Profilenavbar = ({ setShowLogin, menu, setMenu }) => {

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

      <div className="navbar-right">
        <Link to='/search'>
        <img src={assets.search_icon} alt="search_icon" />
        </Link>
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
          <div className="navbar-profile">
            <FontAwesomeIcon
              icon={faUserRegular}
              size="xl"
              style={{ color: "#49557e", cursor:"pointer"}}
            />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}/><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profilenavbar;
