import React, { useState, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext/ProductContext';
import { Product } from '../../components/Index';

const Shop = () => {
    const { products } = useContext(ProductContext);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSize, setSelectedSize] = useState('All');

    const filteredProducts = products.filter(item => {
        return (
            (selectedCategory === 'All' || item.category === selectedCategory) &&
            (selectedSize === 'All' || item.size === selectedSize)
        );
    });

    const handleCategoryChange = category => {
        setSelectedCategory(category);
    };

    const handleSizeChange = size => {
        setSelectedSize(size);
    };

    const categories = [...new Set(products.map(item => item.category))].filter(category => category !== 'electronics');
    
    const sizes = [...new Set(products.map(item => item.size))];

    return (
        <div className="flex">
            <div className="w-1/4 mt-[60px] pl-3">
             <h1 className="text-xl font-extrabold">Filter Product</h1>
                <h3 className="text-lg font-bold">Category</h3>
                <ul>
                    <li
                        className={`cursor-pointer ${
                            selectedCategory === 'All' && 'font-semibold'
                        }`}
                        onClick={() => handleCategoryChange('All')}
                    >
                        All
                    </li>
                    {categories.map(category => (
                        <li
                            key={category}
                            className={`cursor-pointer ${
                                selectedCategory === category && 'font-semibold'
                            }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
                
                <h3 className="text-lg font-bold">Size</h3>
                <ul>
                    <li
                        className={`cursor-pointer ${
                            selectedSize === 'All' && 'font-semibold'
                        }`}
                        onClick={() => handleSizeChange('All')}
                    >
                        All
                    </li>
                    {sizes.map(size => (
                        <li
                            key={size}
                            className={`cursor-pointer ${
                                selectedSize === size && 'font-semibold'
                            }`}
                            onClick={() => handleSizeChange(size)}
                        >
                            {size}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full">
                <section className="py-16">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                            {filteredProducts.map(product => (
                                <Product product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Shop;

