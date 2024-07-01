import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../Index';
import { SidebarContext } from '../../context/SidebarContext/SidebarContext';
import { CartContext } from '../../context/CartContext/CartContext';

const Sidebar = () => {
    const { isOpen, handleClose } = useContext(SidebarContext);
    const { cart, clearCart, itemAmount, total } = useContext(CartContext);

    // Calculate total amount in numeric format
    const numericTotal = Math.round(total || 0);

    return (
        <div className={`${isOpen ? 'right-0' : '-right-full'} bg-white w-full fixed top-0 h-full shadow-2xl md:w-[40vw] xl:max-[50vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>

            <div className='flex items-center justify-between py-6 border-b'>
                <div className='uppercase text=sm font-semibold'>Shopping Bag ({itemAmount})</div>

                <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className='flex flex-col gap-y-2 overflow-y-auto overflow-x-hidden h-[550px] lg:h-[650px] border-b'>
                {cart.map(item => (
                    <CartItem item={item} key={item.id} />
                ))}
            </div>
            <div className='flex w-full justify-between items-center'>
                <div className='py-3 uppercase font-semibold'>
                    <span>Total:</span> Rp {numericTotal}k
                </div>
                <div>
                    <Link to={'/checkout'} className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-200">
                        Checkout
                    </Link>
                </div>
                <div onClick={clearCart} className='cursor-pointer py-3 items-center w-12 h-12 flex justify-center text-xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
