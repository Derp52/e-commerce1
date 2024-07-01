import React from 'react'
import { Slider } from '../../components/Index';

const Home = () => {

    return (
<div className="min-h-screen bg-gray-50">
      <div className="pt-16 container mx-auto p-4">
        
        <h1 className="text-3xl font-bold mb-4">Welcome to Our E-Commerce Site</h1>
        <p className="text-lg">Find the best products at unbeatable prices!</p>
        <Slider/>
      </div>
    </div>
    );
  };

export default Home


