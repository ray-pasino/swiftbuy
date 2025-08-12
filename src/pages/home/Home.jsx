import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/navbar/header/header'
import ExploreCategories from '../../components/exploreCategories/exploreCategories'
import ItemDisplay from '../../components/itemDisplay/ItemDisplay'

const Home = ({ setShowLogin }) => {

  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <ExploreCategories category={category} setCategory={setCategory}/>
      <ItemDisplay category={category} setShowLogin={setShowLogin}/>
    </div>
  )
}

export default Home