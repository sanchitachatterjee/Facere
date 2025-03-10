import React, { useState } from 'react'
import './Css/LoginSignup.css'
const LoginSignup = () => {

  const [state,setState] =useState("Login") //initialize with login string
  const [formData, setFormData] =useState({
    username:"",
    email:"",
    password:""
  })

  //to get data from input field we use onChange and changeHandler function

  const changeHandler=(e)=>{
   setFormData({...formData,[e.target.name]:e.target.value})
  }

  const signup =async()=>{
    console.log("Signup executed ",formData)
    let resdata;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type' :'application/json',
      },
      body: JSON.stringify(formData)
    }).then((resp)=>resp.json()) .then((data) => resdata=data)
    if(resdata.success){
      localStorage.setItem('auth-token',resdata.token)
      window.location.replace("/");
    }
    else{
      alert(resdata.errors)
    }
  }

  const login = async () => {
    console.log("Login executed", formData);

    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                Accept: "application/json",  // Fixed incorrect content type
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const resdata = await response.json();  // Correctly parse JSON response

        if (resdata.success) {
            localStorage.setItem("auth-token", resdata.token);
            console.log("Login successful, redirecting...");
            window.location.replace("/"); // Redirect to home page
        } else {
            console.error("Login failed:", resdata.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-details">
          {state === "Sign Up" ?
            <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Enter your name" /> 
            :<></>
          }
          <input name="email" value={formData.email} onChange={changeHandler}  type="email"  placeholder="Email Address"/>
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
        </div>
        {state === "Sign Up" ?
           <button className='loginsignup-btn' onClick={signup}>Signup</button> :
           <button className='loginsignup-btn' onClick={login}>Login</button>
        }
        
        {state === "Sign Up" ?
           <p className="login">Already have an accont? <span onClick={()=>{setState("Login")}}>Login</span></p>  :
           <p className="login">Create an accont? <span onClick={()=>{setState("Sign Up")}}>SignUp</span></p>
        }

        <div className="agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing I agree to the The and Conditions</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
