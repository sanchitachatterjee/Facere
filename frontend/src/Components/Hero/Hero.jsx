import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/Frontend_Assets/hand_icon.png';
import arrow_icon from '../Assets/Frontend_Assets/arrow.png';
// import hero_image from '../Assets/Frontend_Assets/hero_image.png';
import hero_image1 from '../Assets/Frontend_Assets/hero_image1.jpeg';
const Hero = () => {
  return (
    <div className="hero-main">
      <div className="hero-left">
         <h2>
            NEW ARRIVAL ONLY
         </h2>
            <div>
            <div className="hero-hand-icon">
                <p>New</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>Collection</p>
            <p>For Everyone</p>
            </div>
        
         <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
            </div>
         </div>

      <div className="hero-right">
          <img src={hero_image1} alt="" />
      </div>

    </div>
  )
}

export default Hero
