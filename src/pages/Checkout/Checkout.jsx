import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import { CartItem } from '../../components/Index';
import { Link } from 'react-router-dom';

function Checkout({item}) {
  const [image, setImage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [kurir, setKurir] = useState("");
  const {amount} = item;
  const { total, cart} = useContext(CartContext);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    console.log('Submitted:', image);
    const phoneNumber = '+6282299505783';
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
    navigate('/'); // Navigate to home after submitting
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
        <div className='flex flex-col gap-y-2 overflow-y-auto overflow-x-hidden h-[550px] lg:h=[650px] border-b'>
          {cart.map(item => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <p><span>Total:</span>Rp {parseFloat(total).toFixed(2)}k</p>
        <div className='h-full flex justify-center items-center px-3'>{amount}</div>
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



