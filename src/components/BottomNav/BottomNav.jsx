import {React, useState, useEffect, useContext} from 'react'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faList,faUser, faCartShopping, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {faUser as faUserRegular} from '@fortawesome/free-regular-svg-icons'
import { StoreContext } from "../../context/StoreContext";
import { Link} from "react-router-dom";



import './BottomNav.css'

const BottomNav = ({setShowLogin}) => {

    const [isVisible, setIsVisible] = useState(true); // Tracks navbar visibility
    const [selectedIcon, setSelectedIcon] = useState('home')
    let lastScrollY = window.scrollY; // Store the last scroll position
    const { getTotalCartAmount, token, setToken, getCartItemCount} = useContext(StoreContext);
  
    const itemCount = getCartItemCount();

    const location = useLocation()

    const home = '/'
    const search = '/search'
    const cart = '/cart'
    const profile = '/profile'
    const myorders = '/myorders'


    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // User is scrolling down
        setIsVisible(false);
      } else {
        // User is scrolling up
        setIsVisible(true);
      }
      lastScrollY = window.scrollY; // Update last scroll position
    };

    const handleProfile = ()=>{
      setSelectedIcon('user')
      setShowLogin(true)
    }
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll); // Clean up
      };
    }, []);

  return (
    <div className={`nav-container ${isVisible ? '' : 'hidden'}`}>
    <div className="nav-icons">

      {location.pathname === '/' ?
      <a href='#'>
      <FontAwesomeIcon
        icon={faHouse}
        className={`icon ${selectedIcon === 'home' ? 'selected' : ''}`}
        onClick={() => setSelectedIcon('home')}
        />
        </a> :

      <Link to='/'>
      <FontAwesomeIcon
      icon={faHouse}
      className={`icon ${selectedIcon === 'home' ? 'selected' : ''}`}
      onClick={() => setSelectedIcon('home')}
      />
    </Link>
      
      }


      <a href="#explore-categories">
      <FontAwesomeIcon
        icon={faList}
        className={`icon ${selectedIcon === 'categories' ? 'selected' : ''}`}
        onClick={() => setSelectedIcon('categories')}
        />
        </a>

      {
        location.pathname === '/search' ? 

               
        <a href=''>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={`icon ${selectedIcon === 'search' ? 'selected' : ''}`}
        onClick={() => setSelectedIcon('search')}
      />
      </a> :

             
    <Link to='/search'>
    <FontAwesomeIcon
    icon={faMagnifyingGlass}
    className={`icon ${selectedIcon === 'search' ? 'selected' : ''}`}
    onClick={() => setSelectedIcon('search')}
    />
    
    </Link>
      }
      
     

      {
        location.pathname === '/cart' ?

        <a href='#'>
        <div className='nav-cart'>
        <FontAwesomeIcon
          icon={faCartShopping}
          className={`icon ${selectedIcon === 'cart' ? 'selected' : ''}`}
          onClick={() => setSelectedIcon('cart')}
          />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
          <div className="count">
          {itemCount ? itemCount : ''}
          </div>
          </div>
          </div>
  
          </a> :

      <Link to='/cart'>
      <div className='nav-cart'>
      <FontAwesomeIcon
      icon={faCartShopping}
      className={`icon ${selectedIcon === 'cart' ? 'selected' : ''}`}
      onClick={() => setSelectedIcon('cart')}
      />
     <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
     <div className="count">
     {itemCount ? itemCount : ''}
     </div>
     </div>
     </div>
      </Link>
      }



      { !token ?
        <FontAwesomeIcon
          icon={faUser}
          className={`icon ${selectedIcon === 'user' ? 'selected' : ''}`}
          onClick={handleProfile}
        />
        :
        <Link to='/profile'>
        <FontAwesomeIcon
        icon={faUserRegular}
        className={`icon ${selectedIcon === 'user' ? 'selected' : ''}`}
        onClick={() => setSelectedIcon('user')}
      />
      </Link>
      }
    </div>
  </div>
  )
}

export default BottomNav
