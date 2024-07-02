import React, { useContext } from 'react';
import { Slider, Product } from '../../components/Index';
import { ProductContext } from '../../context/ProductContext/ProductContext';

const Home = () => {
  const { products } = useContext(ProductContext);

  const desiredSize = 'M';
  const filteredProducts = products.filter(product => product.size === desiredSize).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our E-Commerce Site</h1>
        <p className="text-lg">Find the best products at unbeatable prices!</p>
        <Slider />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;




