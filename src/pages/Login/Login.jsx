import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import mockData from "../../context/JSON/MOCK_DATA.json";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(mockData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!email || !password) {
            // If either email or password is empty, display an alert message
            alert("Please fill in both email and password fields.");
            return;
        }

        // Verify email and password against the mock data
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            // If the user is found, set loggedIn to true
            setLoggedIn(true);
        } else {
            // If the user is not found, display an alert message
            alert("Invalid email or password.");
        }
    }

    if (loggedIn) {
        // If logged in, navigate to the home page
        return <Navigate to="/" replace />;
    }

    return (
        <div className="bg-[url('../src/assets/e-commerce.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[300px] max-w-md flex flex-col items-center">
                <div className='text-center text-2xl mb-4'>
                    <h1>Login Page</h1>
                </div>
                <div className="mb-4 flex flex-col items-center">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="email border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:bg-pink-50 focus:border-blue-500" 
                            aria-label="Email"
                        />
                        <label htmlFor="password" className="block mt-4 mb-1">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className="password border border-gray-300 rounded-md px-3 py-2 focus:outline-none hover:bg-pink-50 focus:border-blue-500" 
                            aria-label="Password"
                        />
                        <div className="flex flex-col items-center mt-4 w-full">
                            <button 
                                type="submit"
                                disabled={!email || !password}
                                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-200 w-full" 
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <small className='mt-4'>Don't have an account?</small>
                    <Link to={'/register'} className="text-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-200 w-full">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;



