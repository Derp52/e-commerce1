import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../../context/SidebarContext/SidebarContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import Image from './../../assets/Nasa.jpg'

const Header = () => {
    const {isOpen,setIsOpen} =  useContext(SidebarContext);
    const {itemAmount}= useContext(CartContext);
    const [isActive, setIsActive] = useState(false);
    useEffect(()=> {
        window.addEventListener('scroll', () => {
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
        })
    })

  return ( 
    <header className={`${isActive? 'bg-pink-50 h-[50px] py-4 shadow-md' : 'bg-pink-100 h-[50px]'} fixed w-full z-10 transition-all`}>
        <div className='container mx-auto flex items-center justify-between h-full'>
        <a className="flex items-center no-underline text-inherit">
            <img src={Image} alt="Eclectic Milkyway Shop" className="w-[40px] mr-2" />
            <span>Eclectic Milkyway Shop</span>
        </a>
        <div className="flex space-x-4">
    <Link to={'/'}>Home</Link>
    <Link to={'/product'}>Shop</Link>
    <Link to={'/about'}>About</Link>
    <Link to={'/contact'}>Contact</Link>
</div>
<div className="flex space-x-4">
    <Link to={'/login'}>Login</Link>
    {/* <Link to={'/register'}>SignUp</Link> */}
</div>
        
        <div onClick={()=> setIsOpen(!isOpen)}
        className='cursor-pointer flex relative'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z" clipRule="evenodd" />
                </svg>
                <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12] w-[12px] h-[18px] text-red rounded-full flex justify-center items-center'>{itemAmount}</div>
            </div>
            </div>
        </div>
    </header>
)
};

export default Header;
