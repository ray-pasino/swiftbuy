import React, { useEffect, useState } from 'react'
import './exploreCategories.css'
import { category_list } from '../../assets/assets'
import {Blurhash} from "react-blurhash"

const ExploreCategories = ({category, setCategory}) => {

        const [imgLoaded, setImgLoaded] = useState(false)

        useEffect(()=>{
            const img = new Image()
            img.src = category_list[0].category_image; // Load the first image in the list
            img.onload = () => {
              setImgLoaded(true);
            };
        },[])

  return (
    <div className='explore-categories' id='explore-categories'>
        <h1>Explore Categories</h1>
        <p className='explore-categories-text'>Discover a thoughtfully curated selection of stylish apparel, innovative electronics, modern home appliances, premium beauty essentials, stunning jewelry, elegant furniture, and chic lighting. Elevate your everyday life with unparalleled quality and elegance, one remarkable item at a time.</p>
        <p className='small-text'>Elevate your everyday life with unparalleled quality and elegance, one remarkable item at a time.</p>
        <div className="explore-category-list">
            {category_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.category_name?"All":item.category_name)} key={index} className="explore-category-list-item">
                {!imgLoaded &&
    
                <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
                    <Blurhash
                    key={item.category_name} // Add a unique key prop
                    hash={item.hash}
                    width={110}
                    height={110}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    />
                </div>
                    }
                    {imgLoaded &&

                        <img className={category===item.category_name?"active":""} src={item.category_image}/>
                    }
                        <p>{item.category_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreCategories