import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/ProductContext/ProductContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { addUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username || !address || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    console.log('Submitting user data:', { username, email, password, address, phone });

    try {
      await addUser(username, email, password, address, phone);
      setSignupSuccess(true);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  if (signupSuccess) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-[url('../src/assets/e-commerce.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[300px] max-w-md flex flex-col items-center">
        <div className='text-center text-2xl mb-4'>
          <h1>Registration</h1>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block mb-1">Username</label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  
              className="w-full username border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:bg-pink-50 focus:border-blue-500" 
            />
            <label htmlFor="email" className="block mt-4 mb-1">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              className="email w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:bg-pink-50 focus:border-blue-500"  
            />
            <label htmlFor="password" className="block mt-4 mb-1">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
              className="w-full password border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:bg-pink-50 focus:border-blue-500" 
            />
            <label htmlFor="address" className="block mt-4 mb-1">Alamat Rumah</label>
            <input 
              type="text" 
              id="address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full address border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:bg-pink-50 focus:border-blue-500"  
            />
            <label htmlFor="phone" className="block mt-4 mb-1">Nomor Telepon</label>
            <input 
              type="number" 
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full phone border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:bg-pink-50 focus:border-blue-500"  
            />
            <button 
              type='submit'
              disabled={!email || !password || !username || !address || !phone} 
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-200 w-full" 
            >
              Register
            </button>
          </form>
          <div className='flex items-center flex-col mb-4'>
            <small className='mt-4'>Already Have an Account? </small>
            <Link to={'/login'} className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-200" >Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;


