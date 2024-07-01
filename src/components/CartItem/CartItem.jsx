import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';

const CartItem = ({ item }) => {
  const { id, title, image, price, amount } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);

  const handleIncreaseAmount = () => {
    increaseAmount(id);
  };

  const handleDecreaseAmount = () => {
    decreaseAmount(id);
  };

  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b w-full font-light'>
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>
        <Link to={`/product/${id}`}>
          <img className='max-w-[65px]' src={image} alt='' />
        </Link>
        <div className='w-full flex flex-col'>
          <div className='flex justify-between mb-2'>
            <Link to={`/product/${id}`} className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'>
              {title}
            </Link>
            <div onClick={() => removeFromCart(id)} className='hover:text-red-500 transition text-xl cursor-pointer'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4'>
                <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 1 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
          <div className='bg-pink-50 flex gap-x-2 h-[40px] text-sm'>
            <div className='flex flex-1 max-w-[65px] h-full border font-medium text-primary items-center'>
              <div onClick={handleDecreaseAmount} className='flex-1 h-full flex justify-center items-center cursor-pointer hover:text-red-500'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4'>
                  <path fillRule='evenodd' d='M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z' clipRule='evenodd' />
                </svg>
              </div>
              <div className='h-full flex justify-center items-center px-3'>{amount}</div>
              <div onClick={handleIncreaseAmount} className='flex-1 h-full flex justify-center items-center cursor-pointer hover:text-blue-500'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4'>
                  <path fillRule='evenodd' d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z' clipRule='evenodd' />
                </svg>
              </div>
              <div className='items-center flex-1 flex justify-end px-3'>Rp{price}k</div>
              <div className='items-center flex-1 flex justify-end px-4 w-[110px]'>{`Rp ${(price * amount).toFixed(0)}k`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;





