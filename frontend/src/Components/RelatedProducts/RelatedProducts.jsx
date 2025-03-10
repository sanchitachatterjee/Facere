import React from 'react'
import './RelatedProducts.css'
import Item from '../Items/Item'
import data_product from '../Assets/Frontend_Assets/data'
const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((items,index)=>{
             return <Item key={index} id={items.id} name={items.name} image={items.image}
             new_price={items.new_price} old_price={items.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
