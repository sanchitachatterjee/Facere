import React ,{createContext} from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import { useContext } from 'react'
import dropdownIcon from '../Components/Assets/Frontend_Assets/dropdown_icon.png'
import Item from '../Components/Items/Item'
const ShopCategory = (props) => {
  const {all_product} =useContext(ShopContext)
  return (
    <div className='shopCategory'>
       <img className='shopcategory-banner'src={props.banner} alt="" />
       <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdownIcon} alt="" />
        </div>
       </div>

       <div className="shopcategory-products">
        {all_product.map((items,index)=>{
              if(props.category===items.category){
                    return <Item key={index} id={items.id} name={items.name} image={items.image}
                    new_price={items.new_price} old_price={items.old_price}/>
              }

              else{
                return null;
              }
        })}
       </div>
       <div className="shopcategory-loadmore">
        Explore More
       </div>
    </div>
  )
}

export default ShopCategory
