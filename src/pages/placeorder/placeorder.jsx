import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const placeorder = () => {

  const [paymentLoading, setpaymentLoading] = useState(false)

  const {getTotalCartAmount, token, item_list, cartItems, url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    region:"",
    zipcode:"",
    country:"",
    phone:""
  })


  const onChangeHandler = (event)=> {
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
}

  const  PlaceOrder = async(event)=>{
    setpaymentLoading(true)
    event.preventDefault()
    let orderItems = []
    item_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      email:data.email,
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response = await axios.post(url+"/api/order/placeorder", orderData, {headers:{token}})
    setpaymentLoading(false)
    if (response.data.success){
      const {authorizationUrl} = response.data
      window.location.replace(authorizationUrl)
    }else{
      alert(response.data.message)
    }
  }

  const navigate = useNavigate()

  useEffect (()=>{
    if (!token){
      navigate('/cart')
    }else if(getTotalCartAmount()==0){
      navigate('/cart')
    }
  },[token])

  return (
    <form className='place-order' onSubmit={PlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler}  value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastname' onChange={onChangeHandler}  value={data.lastname} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' type="email" onChange={onChangeHandler} value={data.email} placeholder='Email address'/>
        <input required name='street' type="text" onChange={onChangeHandler} value={data.street} placeholder='Street'/>
        <div className="multi-fields">
          <input required name='region' type="text" onChange={onChangeHandler} value={data.region} placeholder='Region'/>
          <input required name='city' type="text" onChange={onChangeHandler} value={data.city} placeholder='City'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} type="text" value={data.zipcode} placeholder='Zip Code'/>
          <input required name='country' onChange={onChangeHandler} type="text" value={data.country} placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} type="text" value={data.phone} placeholder='Phone'/>
      </div>

      <div className="place-order-right">
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
          {
            paymentLoading ?
            <button type='submit' className='btnLoading' ><FontAwesomeIcon icon={faCircleNotch} spin/></button>
            :
            <button  type='submit'>PROCEED TO PAYMENT</button>
          }
        </div>
      </div>
    </form>
  )
}

export default placeorder

