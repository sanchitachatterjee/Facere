
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/Frontend_Assets/banner_mens.png'
import women_banner from './Components/Assets/Frontend_Assets/fashion.png'
import kids_banner from './Components/Assets/Frontend_Assets/banner_kids.png'
import PaymentGateway from './Components/PaymenGateway/PaymenGateway';

function App() {
  return (
    <div>
      <BrowserRouter> 
      <Navbar/>
      <Routes> 
      <Route path='/' element={<Shop/>}/>
      <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}/>
      <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
      <Route path='/kid' element={<ShopCategory banner={kids_banner} category="kid"/>}/>

      <Route path='/product' element={<Product/>} >   
      <Route path=':product_id' element={<Product/>}/>           
      </Route>
      <Route path="/payment" element={<PaymentGateway/>} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
