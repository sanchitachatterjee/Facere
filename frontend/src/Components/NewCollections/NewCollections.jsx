import React, { useEffect, useState } from 'react'
import './NewCollections.css'

import Item from '../Items/Item';
const NewCollections = () => {
   
  const [newCollection,setNewCollection]= useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/newcollections")
    .then((resp)=>resp.json())
    .then((data)=>setNewCollection(data))
  },[])
  //[] it means useEffect will run only once

  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className="collections">
        {newCollection.map((items,i)=>{
          return <Item key={i} id={items.id} name={items.name} image={items.image}
          new_price={items.new_price} old_price={items.old_price}/>
        })}
        </div>
    </div>
  )
}

export default NewCollections
