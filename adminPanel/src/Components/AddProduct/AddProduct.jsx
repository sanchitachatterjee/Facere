import React, { useState } from 'react'
import './AddProduct.css'
import uploadIcon from '../../assets/upload_Area.svg'
const AddProduct = () => {

    const [image,setImage] =useState(false);
    const [productDetails, setProductDetails] =useState({
        name:"",
        image:"",
        category:"women",//otherwise it wont able to add women products
        new_price:"",
        old_price:""
    })
    const imageHandler= (e)=>{
        setImage(e.target.files[0]);
    }
    const changeHandler= (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const add_Product =async()=>{
        console.log(productDetails)
        let res;
        let product= productDetails;

        let formData = new FormData();
        formData.append('product',image);
        await fetch('http://localhost:4000/upload', {
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData,
        }).then((resp) =>resp.json()).then((data)=>{
            res= data
        })

        if(res.success){
            product.image=res.image_url;
            console.log(product)
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                  Accept:  'application/json',
                  'Content-Type':'application/json',        
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                if(data.success){
                    alert("Product is added");
                    setProductDetails({
                        name:"",
                        image:"",
                        category:"women",
                        new_price:"",
                        old_price:"",
                    })
                }
                else{
                    alert("Failed")
                }

            })
        }
    }
  return (
    <div className='addproduct'>
        <div className="addproduct-items">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Enter title'/>
        </div>
        <div className='addproduct-price'>
            <div className="addproduct-items">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Enter old price'/>
            </div>
            <div className="addproduct-items">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Enter new price'/>
            </div>
        </div>

        <div className='addproduct-items'>
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='productSelector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
            </select>
        </div>

        <div className='addproduct-items'>
            <label htmlFor="fileInput">
                <img src={image?URL.createObjectURL(image):uploadIcon} className='uploadIcon' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='fileInput' hidden/>
        </div>
        <button onClick={()=>{add_Product()}} className='addproduct-btn'>Upload</button>
    </div>
  )
}

export default AddProduct