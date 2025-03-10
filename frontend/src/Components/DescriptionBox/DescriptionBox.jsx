import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
       <div className="descbox-navigator">
         <div className="descbox-navbox">    Description    </div>
         <div className="descbox-navbox fade">    Review {122}    </div>
       </div>

       <div className="descbox-description">
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus labore quaerat
             voluptas consequuntur voluptate repellendus debitis numquam reiciendis molestias ipsum.</p>

        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, repellendus!
        </p>
       </div>
    </div>
  )
}

export default DescriptionBox
