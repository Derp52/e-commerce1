import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import { ProductContext } from '../../context/ProductContext/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const productId = id;
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <section className='h-screen flex justify-center items-center'>Loading...</section>;
  }

  const { name, price, desc, image,stock, size } = product;

  return (
    <section className='pt-32 pb-12 lg:py-32 min-h-screen flex items-center'>
      <div className='container mx-auto'>
        <Link to={"/product"} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mt-10 absolute top-4 left-4">
          Back
        </Link>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-sm' src={image} alt="" />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{name}</h1>
            <p className='mb-8'>{desc}</p>
            <p className='mb-8'>{stock}</p>
            <p className='mb-8'>{size}</p>
            <div className='text-xl text-red-500 font-medium mb-6'>
              Rp{price}k
            </div>

            <button onClick={() => addToCart(product, product.id)} className='py-4 px-8'>Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

