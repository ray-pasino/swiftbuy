import React from 'react'
import './CartFooter.css'
import { assets } from '../../assets/assets'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook,faInstagram,faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import {faTty,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const CartFooter = ({setMenu}) => {
  return (
    <div className='footer' id='cart-footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt='swiftbuylogo' className='logo'/>
                {/* <div className='logo'>logo .</div> */}
                <p>At Swift Buy GH, we are committed to delivering exceptional service, ensuring timely and secure transportation of goods across Ghana.</p>
                <div className="footer-social-icons">
                    <a href='#'><FontAwesomeIcon icon={faFacebook} size='2xl' className='social-icon'/></a>
                    <a href='#'><FontAwesomeIcon icon={faInstagram} size='2xl' className='social-icon'/></a>
                    <a href='#'><FontAwesomeIcon icon={faWhatsapp} size='2xl' className='social-icon'/></a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>LINKS</h2>
                <ul>
                    <Link to='/'>
                    <li onClick={()=>setMenu("home")}>Home</li>
                    </Link>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                    <ul>
                     <li><a href='tel:+233 50 123 4567'><FontAwesomeIcon icon={faTty} size='lg' className='phoneIcon'/>+233 50 123 4567</a></li>
                     <li><a href = "#"><FontAwesomeIcon icon={faEnvelope} size='lg' className='mailIcon'/>swiftbuy@email.com</a></li>
                    </ul>
            </div>
        </div>
        <hr /> 
        <p className="footer-copyright">Copyright 2025 © Swift Buy GH - All Rights Reserved</p>
    </div>
  )
}

export default CartFooter