import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addproductIcon from '../../assets/Product_Cart.svg'
import listproductIcon from '../../assets/Product_list_icon.svg'
const Sidebar = () => {
  return (
    <div className='sidebar'>
    <Link to={'/addproduct'} style={{textDecoration:'none'}}>
      <div className="items">
        <img src={addproductIcon} alt="" />
        <p>Add Product</p>
      </div>
    </Link>

    <Link to={'/listproduct'} style={{textDecoration:'none'}}>
      <div className="items">
        <img src={listproductIcon} alt="" />
        <p> Product List</p>
      </div>
    </Link>
    </div>
  )
}

export default Sidebar