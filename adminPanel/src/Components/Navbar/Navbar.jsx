import React from 'react'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='images'>
        <img src={navlogo} className='navlogo' alt="" />
        <img src={navProfile} className='navProf' alt="" />
        </div>
        <div style={{color:"#aa26da" , fontWeight:'bolder' , fontSize:'25px', font:'15px'}}>Facere
             <div style={{fontSize:'13px'}}>Admin Panel</div>
        </div>    
     </div>
  )
}

export default Navbar