import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';

const Product = ({ product }) => {
    const {id, image, category, name, price, size} = product;
    const {addToCart} =useContext(CartContext)
    return (
        <div>
            <div className='border border-pink-50 h-[300px] mb-4 relative overflow-hidden group transition'>
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-[200px] mx-auto flex justify-center items-center'>
                        <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={image} alt="" />
                    </div>
                    <div className="absolute top-2 -right-3 p-2 transition-all opacity-0 group-hover:opacity-50 duration-300 group-hover:right-3">
                        <button onClick={() => addToCart(product,id)} className='hover:text-blue-500'>
                            <div className='flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                </svg>
                            </div>
                        </button>
                        <Link to={`/product/${id}`} className='w-12 h-12 flex drop-shadow-xl hover:text-red-100'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>

            </div>

            <div>
                <div className='text-sm capitalize text-gray-500'>{category}</div>
                <div className='text-sm capitalize text-gray-500'>{size}</div>
                <Link to={`/product/${id}`}>
                <h1 className='font-semibold'>{name}</h1>
                </Link>
                <span className='font-semibold'>Rp{price}k</span>
            </div>
        </div>
    );
  };
  
  export default Product;