import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { About, Checkout, Contact, Home, Login, ProductDetails, Shop, SignUp } from './pages'
import { Sidebar, Header, Footer } from './components/Index';


const RootRouter = () => {
return(
    <Router>
        <Header/>
            <Routes>                
                <Route path='/' element={<Home/>} />
                <Route path='/product' element={<Shop/>} />
                <Route path='/product/:id' element={<ProductDetails/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<SignUp/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/checkout' element={<Checkout/>} />
            </Routes>
        <Sidebar/>
        <Footer/>
    </Router>
);
};

export default RootRouter;