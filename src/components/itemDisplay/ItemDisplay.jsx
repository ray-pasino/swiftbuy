import React, { useContext, useState, useEffect} from 'react'
import './ItemDisplay.css'
import { StoreContext } from '../../context/StoreContext'


import Item from '../item/item'
import Skeleton from '../skeleton/Skeleton'
import Shimmer from '../Shimmer/Shimmer'
import { assets } from '../../assets/assets'

const ItemDisplay = ({category, setShowLogin}) => {
    const {item_list} = useContext(StoreContext)

    const fallbackImage = assets.placeholder 

  return (
    <div className='item-display' id='item-display'>
        <h2>Explore {category === "All" ? " your favourite items" :category}</h2>
            {item_list && item_list.length > 0 ? (
        <div className="item-display-list">

            {item_list.map((item,index)=>{
              if (category==="All" || category===item.category){

                return <Item key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} fallbackImage={fallbackImage} setShowLogin={setShowLogin}/>
              }
            })}
        </div>
          ) :(
            
              <div className="item-display-list skeleton-wrapper">

              {Array(15).fill(0).map((_, index) => (
              <Skeleton key={index} />
              ))}
              <Shimmer/>
              </div>
          )}
    </div>
  )
}

export default ItemDisplay