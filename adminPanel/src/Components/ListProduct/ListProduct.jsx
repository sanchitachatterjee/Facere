import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import removeIcon from '../../assets/cross_icon.png'
const ListProduct = () => {

  const [allProducts,setAllProducts]= useState([]);
  const fetchInfo= async()=>{
    await fetch('http://localhost:4000/allproducts').then((resp)=>resp.json()).then((data)=>{
      setAllProducts(data)
    })
  }

  useEffect(()=>{
    fetchInfo();
  },[]) //by adding this[] the function will execute only once

  const removeProduct= async(id1)=>{
     await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id1})
     })
     await fetchInfo();
  }
  return (
    <div className='listProduct'>
      <h1>List of Products</h1>
        <div className="listproduct-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-products">
           <hr />
           {allProducts.map((product,i)=>{
            //below we have two class Names listproduct-main and format-main
             return <> 
               <div key={i} className="listproduct-main format-main">  
                <img src={product.image} alt="" className="listproduct-productIcon" />
                <p>{product.name}</p>
                <p>{product.old_price} </p>
                <p>{product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeProduct(product.id)}} className='removeIcon' src={removeIcon} alt="" />
               </div>
               <hr /> 
             </>//empty tag

           })}
        </div>
    </div>
  )
}

export default ListProduct