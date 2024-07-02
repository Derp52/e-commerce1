import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import { OrderContext } from '../../context/ProductContext/ProductContext';
import { CartItem } from '../../components/Index';
import mockdata from '../../context/JSON/MOCK.json';

function Checkout() {
  const [image, setImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [kurir, setKurir] = useState("");
  const { total, cart } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const {id_user} = mockdata
  const navigate = useNavigate();

  // Calculate the total quantity of items in the cart
  const amount = cart.reduce((acc, item) => acc + item.amount, 0);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async () => {
    console.log('Submitted:', image);
    const phoneNumber = '+6282299505783';
  
    // Convert total to integer (assuming total is already a number)
    const totalNumeric = Math.round(total || 0); // Round to nearest integer
  
    // Ensure user_id is fetched and not an empty string
    const userId = id_user || null; // Use null if user_id is ''
  
    const orderData = {
      quantity: amount,
      total_price: totalNumeric,
      image: image ? image.name : "",
      kurir,
      product_id: cart.map(item => item.id).join(', '),
      user_id: userId // Pass userId, ensuring it's not an empty string
    };
  
    try {
      await placeOrder(orderData); // Submit order to the database
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
      navigate('/'); // Navigate to home after submitting
    } catch (error) {
      console.error('Failed to place order', error);
    }
  };
  
  

  useEffect(() => {
    if (timeLeft === 0 && !image) {
      navigate('/');
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        console.log(`Time left: ${prevTime - 1} seconds`);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [timeLeft, image, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 container mx-auto p-4">
        <Link to="/" className="bg-gray-300 text-gray-800 px-4 py-2 rounded mt-4 mb-5">
          Back
        </Link>
        <h1 className="text-3xl font-bold mt-10 mb-4">Payment</h1>
        <p className="text-lg">Kirim Pembayaran Ke BCA</p>
        <p className="text-lg">No.Rek 12345678</p>
        <p className="text-lg">Atas Nama David</p>
        <div className='flex flex-col gap-y-2 overflow-y-auto overflow-x-hidden h-[550px] lg:h-[650px] border-b'>
          {cart.map(item => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <p><span>Total Item:</span>{amount}</p>
        <p><span>Total Price:</span>{`Rp ${Math.round(total || 0)}k`}</p>

        
        <label htmlFor="Kurir" className="block mb-1">Kurir</label>
          <select
            id="Kurir"
            value={kurir}
            onChange={(e) => setKurir(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          >
            <option value="">Select Kurir</option>
            <option value="JNE">JNE</option>
            <option value="J&T">J&T</option>
            <option value="SiCepat">SiCepat</option>
            <option value="Tiki">Tiki</option>
            <option value="Anteraja">Anteraja</option>
          </select>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected Image"
              className="mt-4 max-w-full"
            />
          )}
          
          <button
            onClick={handleSubmit}
            disabled={!(image && kurir)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;











