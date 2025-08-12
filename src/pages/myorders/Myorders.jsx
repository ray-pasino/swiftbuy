import React, { useContext, useEffect, useState } from 'react'
import "./Myorders.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-regular-svg-icons'
import {faPhone, faBan, faBox} from '@fortawesome/free-solid-svg-icons'
import CartNavbar from '../../components/cartNavbar/CartNavbar'

const Myorders = () => {

    const {url, token} = useContext(StoreContext)
    const [data, setData] = useState([])
    const [trackOder, setTrackOrder] = useState(false)
    const [loadOrderlist, setLoadingOrderList] = useState(true)


    const fetchOrders = async () =>{
        const response = await axios.post(url + "/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
        setLoadingOrderList(false)
    }



    const handleTrackOrder = () => {
        setTrackOrder(true)
    }

    const handleCloseModal = () =>{
        setTrackOrder(false)
    }


    useEffect(()=>{
        if (token){
            fetchOrders() 
        }
    }, [token])
  return (
    <>
    <CartNavbar/>
      
    <div className='my-orders'>
      <h2>my Orders</h2>
      {
        loadOrderlist ?

        <div className='verify'>
            <div className="spinner"></div>
        </div> 
    :
      <div className="container">
        {
            data.length === 0 ? 
            (
                <div>
                <h2 className="empty-orders-text">You have not made any orders</h2>
              <div className="empty-orders-container">
                <FontAwesomeIcon icon={faBox}  style={{color: "#666",}} className="cart-icon"/>
                <FontAwesomeIcon icon={faBan}  style={{color: "red",}} className="ban-icon"/>
              </div>
              <h2 className="empty-orders-text-2">Start shopping to view your orders</h2>
                        </div> 
            ) :(

        data.map((order,index)=>(
    
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt="parcel_icon" />
                    <p>{order.items.map((item, index)=>{
                        if(index == order.items.length-1){
                            return item.name+" x "+item.quantity
                        }else{
                            return item.name+" x "+item.quantity+", "
                        }
                    })}</p>
                    <p>GH₵{order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button onClick={handleTrackOrder}>Track Order</button>
                </div>
                
            )
        )
    )
    }
      </div>
    }
  </div>

  {trackOder && 
      <>
      <div className='Shadow' onClick={handleCloseModal}></div>
      <div className='contact-btns'>
        <h2>Track Your Order Via</h2>
        <div className="icons">
            <a href='tel:+233 50 123 4567'><FontAwesomeIcon icon={faPhone} style={{color: "#1897FE"}}/></a>
            <a href='https://wa.me/+233508932788?text=Hello, I would like to request an update on the status of my order. Could you please provide me with the latest tracking information?' target='_blank'><FontAwesomeIcon icon={faWhatsapp} style={{color: "#63E6BE"}}/></a>
            <a href="mailto:swiftbuy@email.com?subject=Order Tracking Request&body=Hello, I would like to request an update on the status of my order. Could you please provide me with the latest tracking information?" target='_blank'><FontAwesomeIcon icon={faEnvelope} style={{color: "tomato"}}/></a>
        </div>
      </div>
      </>
  }
  </>
  )
}

export default Myorders
