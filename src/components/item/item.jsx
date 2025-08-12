import React, { useContext, useState} from 'react'
import './item.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'


const Item = ({id,name,price,description,image,fallbackImage,setShowLogin}) => {

  
  const {cartItems,addToCart,removeFromCart,url, token} = useContext(StoreContext)

  const [ImageLoaded, setImageLoaded] = useState(false)

  const handleAddtoCart = ()=> {
    if(!token){
        setShowLogin(true)
    }else{
      addToCart(id)
    }
  }
  return (
    <div className='item'>
        <div className="item-img-container">
          {/* item image */}
            <img className='item-image' 
            src={url+"/images/"+image} 
            style={{ display: ImageLoaded ? 'block' : 'none' }}  
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            /> 
            {!ImageLoaded && (
            <img
            className='item-image'
            src={fallbackImage}
            alt={name}
            style={{ display: 'block' }}
            />

)}
            {!cartItems[id]
              ?<img className='add' onClick={()=>handleAddtoCart()} src={assets.add_icon_white}/>
              :<div className='item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red}/>
                <p>{cartItems[id]}</p>
                  <img  onClick={()=>addToCart(id)}src={assets.add_icon_green}/>
              </div>
            }
        </div>
        <div className="item-info">
            <div className="item-info-rating">
                 <p>{name}</p>
                 <img src={assets.rating_starts} className="rating"/>
            </div>
            <p className="item-desc">{description}</p>
            <p className='item-price'>GH₵{price}</p>
        </div>
    </div>
  )
}

export default Item