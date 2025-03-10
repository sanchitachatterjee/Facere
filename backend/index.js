const PORT= 4000;
const express= require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path= require("path");
const cors=require("cors");
const { error } = require("console");
const { AsyncLocalStorage } = require("async_hooks");


app.use(express.json())
app.use(cors());



mongoose.connect("mongodb+srv://sanchitachatterjee42:%23Richomku09@cluster0.opr09.mongodb.net/Facere?retryWrites=true&w=majority&tls=true", 
    {
        tlsInsecure: true, // Allows insecure TLS connections
        connectTimeoutMS: 30000, // Increase timeout to 30s
    }
);


// api creation 

app.get("/",(req,res)=>{
 res.send("Server is running")
})


//create image storage engine
const Storage =multer.diskStorage({
    destination: './Upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//create api for upload
const upload =multer({storage:Storage});

app.use('/images',express.static('Upload/images'));
app.post("/upload",upload.single('product'), (req,res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${PORT}/images/${req.file.filename}`,
    })
})

//Schema for creating products

const Product= mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },

    name:{
        type:String,
        required:true,
    },
    
    image:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true,
    },
    new_price:{
       type:Number,
       required:true,
    },
    
    old_price:{
        type:Number,
        required:true,
    },

    date:{
        type:Date,
        default:Date.now,
    },
    
    available:{
        type:Boolean,
        default:true,
    },
})

//create api for adding products

app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({});
    let id;
    if (products.length>0){
        let last_product_array= products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        old_price:req.body.old_price,
        new_price:req.body.new_price,
    });
    console.log(product);
    await product.save();
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Create api for delteing any product

app.post('/removeproduct',async(req,res)=>{
   await Product.findOneAndDelete({id:req.body.id});
   console.log("removed");
   res.json({
    success:true,
    name:req.body.name
   })
})


//Create api for getting all products


app.get('/allproducts', async(req,res)=>{
  let products= await Product.find({});
  console.log("All products retrieved");
  res.send(products);
})



//Schema creating for user model

const Users= mongoose.model('Users',{
    name:{
        type:String,    
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating endpoint for registering the user

app.post('/signup',async(req,res)=>{
  let check =await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"Existing user found with same email id"})
  }

  let cart={};
  for(let i=0; i<250;i++){
    cart[i]=0;
  }

  const user= new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })

  await user.save();
  const data ={
    user:{
        id:user.id,
    }
  }
  const token=jwt.sign(data,'secret_ecom')
  res.json({success:true,token})
})

//creating endpoint for login

app.post('/login',async(req,res)=>{
   let user =await Users.findOne({email:req.body.email})
   if(user){
      const pwCompare = req.body.password === user.password;
      if (pwCompare){
        const data ={
            user:{
              id:user.id
            }
        }

        const token= jwt.sign(data,'secret_ecom')
        res.json({success:true,token})
      }

      else{
        res.json({success:false,errors:"Wrong password"})
      }
   }

   else{
    res.json({success:false, errors:"Email is not registered"})
   }
})

//creating endpoint for newcollection data

app.get('/newcollections',async(req,res)=>{
     let products =await Product.find({});
     let newcollection= products.slice(1).slice(-8); //we will get recently added 8 products
     console.log("new collections fetched.")
     res.send(newcollection);
})

//creating endpoint for popular in women section

app.get('/popularwomen',async(req,res)=>{
   let products= await Product.find({category:"women"})
   let popularInWomen= products.slice(0,4)
   res.send(popularInWomen)
})

// creating middleware

const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        console.log("❌ No token received");
        return res.status(401).json({ error: "Access Denied: No token provided" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        console.log("✅ Token Verified, User ID:", req.user.id);
        next();
    } catch (error) {
        console.error("❌ Token verification failed:", error.message);
        return res.status(401).json({ error: "Access Denied: Invalid token" });
    }
};


//creating endpoint for adding products in cart data

app.post('/addtocart',fetchUser,async(req,res)=>{
   console.log(req.body, req.user);
   let userData= await Users.findOne({_id:req.user.id});
   userData.cartData[req.body.itemId]+=1;
   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
   res.send("Added")
})

//creating endpoint to remove products cartData


app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if item exists in cart
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        } else {
            return res.status(400).json({ error: "Item not in cart" });
        }

        //  Correctly update the user's cart in the database
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//creating end point to retrieve cart data after loging in
app.post('/getcart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//payment
app.post('/paytm', async (req, res) => {
    try {
        console.log("Processing Payment...", req.body);
        res.json({ success: true, message: "Payment Successful" });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, message: "Payment Failed" });
    }
});
app.listen(PORT, (error)=>{
    if(!error){
        console.log("Server ruuning on "+ PORT)
    }
    else{
        console.log("Error" +error)
    }
})