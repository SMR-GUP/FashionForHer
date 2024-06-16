import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import getPincodeDeliveryDays from '@/utils/pincodeDelivery';
import { getUserFromToken } from "../utils/auth";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [firName, setFirName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const handleSubmit = async (event) => {


    if(getPincodeDeliveryDays(pincode)==0)
      {
        alert('Sorry! we are not serviceable in your area');
        return;
      }
    event.preventDefault();

    const offset = 330; // UTC+5:30 (Indian time zone)
const date = new Date();
const indianTime = new Date(date.getTime() + (offset * 60 * 1000));
const dateString = indianTime.toISOString();


    
      const response = await fetch("/api/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user._id,
          first: firName,
          last: lastName,
          pin: pincode,
          city: city,
          state: state,
          address: address,
          items: products,
          date: dateString,
          amount: calculateTotal()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        try{
          const res=await fetch('/api/clearCart',{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId:user._id
             }),
          });
          const data = await res.json();
    
          if (res.ok) {
            alert('Order Placed Successfully!!!');
          } else {
            console.error(data.message);
          }
        }
    
        catch (error) {
          console.error('Failed to clear cart');
        }
        window.location.assign('/order');
      } else {
        console.error("error placing order", data);
        alert("Failed place order");
      }
    
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  useEffect(() => {
    const userInfo = getUserFromToken();
    if (userInfo !== null) {
      setUser(userInfo.user);
      setEmail(userInfo.user.email);
    }
  }, []);

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await fetch(`/api/getCart?id=${user._id}`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data.user.cart);
        } else {
          console.error("Error fetching cart details", data);
        }
      } catch (error) {
        console.error("Error fetching cart details", error);
      } finally {
      }
    };

    fetchCartDetails();
  }, [user]);

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div className="min-h-screen bg-indigo-500 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        {/* Left part: Shipping Information */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-2 border border-gray-300 rounded"
                onChange={(e) => setFirName(e.target.value)}
                required
                autoComplete="off"

              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-2 border border-gray-300 rounded"
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Email Address"
              readOnly
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleStateChange}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setCity(e.target.value)}
              required
              autoComplete="off"


            />
            <input
              type="text"
              placeholder="Pincode"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setPincode(e.target.value)}
              required
              autoComplete="off"
            />
            <textarea
              placeholder="Complete Address"
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              onChange={(e) => setAddress(e.target.value)}
              required
              autoComplete="off"
            ></textarea>

            <button
              type="submit"
              className="mt-12 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
            >
              Order Now
            </button>
          </form>
        </div>

        {/* Right part: Order Summary */}
        <div className=" p-6 bg-gray-100 rounded-r-lg ">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-300 max-h-80 overflow-y-auto">
            {products.map((product, index) => (
              <li key={index} className="mb-8 flex items-center ">
                <img
                  src={product.image}
                  alt={product.heading}
                  className="w-32 h-32 object-cover mr-6 rounded-lg shadow-md"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black">
                    {product.heading}
                  </h3>
                  <p className="text-lg text-gray-600">
                    Size: <span className="font-medium">{product.size}</span>
                  </p>
                  <p className="text-lg font-bold text-green-800 mt-2">
                    Price: ₹{product.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 rounded-lg text-center">
            <p className="font-mono text-2xl text-black font-bold border-2 border-gray-100  rounded-full pl-3 pr-3 bg-white">
              Total to Pay On Delivery:{" "}
              <span className="font-bold">₹{calculateTotal()}</span>
            </p>
          </div>
          <button className=" w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
            <Link href="/">Back to Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
