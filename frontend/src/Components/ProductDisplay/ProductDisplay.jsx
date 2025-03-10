import React, { useContext, useState} from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/Frontend_Assets/star_icon.png'
import star_dull_icon from '../Assets/Frontend_Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} =useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
         <div className="display-imagelist">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
         </div>

         <div className="display-image">
            <img className='main-img' src={product.image} alt="" />
         </div>

      </div>

      <div className="productdisplay-right">
         <h1>{product.name}</h1>
         <div className="display-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>{122}</p>
         </div>

         <div className="display-right-prices">
            <div className="right-oldprice">
               ₹{product.old_price}
            </div>
            <div className="right-newprice">
               ₹{product.new_price}
            </div>
         </div>

         <div className="display-right-description">
         V-Neck Ethnic Motifs A-Line Midi Dress
         </div>
         <div className="display-right-size">
            <h1>Select size</h1>
            <div className="sizes">
               <div>XS</div>
               <div>S</div>
               <div>M</div>
               <div>L</div>
               <div>XL</div> 
               <div>XXL</div>
               <div>XXXL</div>
            </div>      
         </div>
         
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className='display-right-category'><span>Category :</span> Women, T-shirt, Crop Top</p>
        <p className='display-right-category'><span>Tags :</span> Modern , Latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay
