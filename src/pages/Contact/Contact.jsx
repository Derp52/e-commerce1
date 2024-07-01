// import React from 'react'

// function Contact() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="pt-16 container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4">Contact</h1>
//         <p className="text-lg">Find the best products at unbeatable prices!</p>
//       </div>
//     </div>
//   )
// }

// export default Contact

import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission, such as sending an email
    console.log('Form submitted:', { name, email, message });
    // Optionally, you can reset the form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className=" px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
