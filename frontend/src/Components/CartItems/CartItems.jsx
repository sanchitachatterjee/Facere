import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import removeIcon from '../Assets/Frontend_Assets/cart_cross_icon.png'
const CartItems = () => {
    const {all_product, cartItems,removeFromCart,getTotalCartAmount} =useContext(ShopContext);
    const navigate = useNavigate();
  return (
    <div className='cartitems'>
       <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
       </div>

       <hr/>
       {all_product.map((e)=>{
        if(cartItems[e.id]>0){
            return  <div>
            <div className="cartitems-format cartitems-format-main">
                <img src={e.image} className='cart-productIcon'/>
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className='cartItems-quantity'>{cartItems[e.id]}</button>
                <p>₹{e.new_price*cartItems[e.id] }</p>
                <img src={removeIcon} onClick={()=>{removeFromCart(e.id)}} className='cartItems-removeIcon' />
            </div>
            <hr/>
           </div>
        }

        return null;
       })}
       <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>Cart Totals</h1>
          <div>

           <div className="total-item">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>

          </div>

          <button onClick={() => navigate("/payment")}>PROCEED TO CHECKOUT</button>

          </div>

          <div className="promo-code">
            <p>If you have a promo code,Enter that below</p>
            <div className="promo-box">
              <input type="text" placeholder='Promo Code'/>
              <button>Submit</button>
          </div>
        </div>

       </div>
    </div>
  )
}

export default CartItems
