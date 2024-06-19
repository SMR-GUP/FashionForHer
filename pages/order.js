import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import getPincodeDeliveryDays from "@/utils/pincodeDelivery";
import { getUserFromToken } from "../utils/auth";

const order = () => {
  const [user, setUser] = useState(null);
  const [details, setDetails] = useState(null);
  const [products, setProducts] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);

  useEffect(() => {
    const fetchUserAndOrderDetails = async () => {
      const userInfo = getUserFromToken();
      if (userInfo !== null) {
        setUser(userInfo.user);
        try {
          const response = await fetch(`/api/getOrder?id=${userInfo.user._id}`);
          const data = await response.json();
          if (response.ok) {
            const orders = data.orders;
            const lastOrder = orders[orders.length - 1];
            setProducts(lastOrder.items);
            setDetails(lastOrder);
            const days = getPincodeDeliveryDays(lastOrder.pincode);
            var date = new Date();
            date.setDate(date.getDate() + days);
            setDeliveryDate(date);
          } else {
            console.error("Error fetching order details", data);
          }
        } catch (error) {
          console.error("Error fetching order details", error);
        }
      }
    };

    fetchUserAndOrderDetails();
  }, []);

  if (!user || !details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-indigo-500 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Order Confirmation
        </h1>
        <img
          src="/greentick.jpg"
          alt="Green Tick"
          className="mx-auto mb-1 w-38 h-32"
        />

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <tbody>
                <tr className="bg-blue-100">
                  <td className="px-4 py-2 font-semibold">Ordered By:</td>
                  <td className="px-4 py-2">
                    {details.firstName + " " + details.lastName}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Address:</td>
                  <td className="px-4 py-2">{details.address}</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="px-4 py-2 font-semibold">City:</td>
                  <td className="px-4 py-2">{details.city}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">State:</td>
                  <td className="px-4 py-2">{details.state}</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="px-4 py-2 font-semibold">Pincode:</td>
                  <td className="px-4 py-2">{details.pincode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-blue-100" : "bg-gray-100"}
                  >
                    <td className="px-4 py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <p className="font-semibold ">{item.heading}</p>
                    </td>
                    <td className="px-4 py-2">
                      <p>Size: {item.size}</p>
                    </td>
                    <td className="px-4 py-2">
                      <p>Price: ₹{item.price}</p>
                    </td>
                  </tr>
                ))}
                <tr className="bg-yellow-100">
                  <td
                    colSpan="3"
                    className="text-lg px-4 py-2 font-semibold text-right"
                  >
                    Amount Payable At Delivery:
                  </td>
                  <td className="text-lg px-4 py-2 font-semibold">
                    ₹{details.amount}
                  </td>
                </tr>
                <tr className="bg-yellow-100">
                  <td
                    colSpan="3"
                    className="text-lg px-4 py-2 font-semibold text-right"
                  >
                    Expected Delivery Date:
                  </td>
                  <td className="text-lg px-4 py-2 font-semibold">
                    {deliveryDate.toDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-lg mt-6">
          <Link href="/" className=" text-blue-950 hover:underline">
            Back to Home
          </Link>
          <Link
            href="/profile "
            className="ml-3  text-blue-950 hover:underline"
          >
            View your orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(order), { ssr: false });
