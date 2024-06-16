import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import getPincodeDeliveryDays from '@/utils/pincodeDelivery';
import { getUserFromToken } from "../utils/auth";



const profile = () => {

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(null);


    const handleCheckDeliveryDate = (pincode,date) => {
      const days = getPincodeDeliveryDays(pincode);
       var orderDate = date;
       orderDate.setDate(orderDate.getDate() + days);
      return orderDate.toDateString();
 };

    useEffect(() => {
        const userInfo = getUserFromToken();
        if (userInfo !== null) {
          setUser(userInfo.user);
         
        }
      }, []);



      //wishlist fetch
    
      useEffect(() => {
        const fetchOrders= async () => {
          if (!user) {
            return;
          }
    
          try {
            const response = await fetch(`/api/getWishlist?id=${user._id}`);
            const data = await response.json();
    
            if (response.ok) {
              const orders = data.user.orders;
              setOrders(orders.reverse());
    
              // Fetch product details for each item in the wishlist
            
            } else {
              console.error("Error fetching order details", data);
            }
          }catch (error) {
            console.error("Error fetching order details", error);
          }
        };
    
        if (user) {
          fetchOrders();
        }
      }, [user]);
     
      if (!user || !orders) {
        return <div>Loading...</div>;
      }


  return (
    <div  style={styles.container}>
   <h1 className='text-4xl font-extrabold font-mono mb-3 text-indigo-900 ' style={styles.email}>📑Order History</h1>
   <h1 className='text-xl font-bold font-mono text-green-700 'style={styles.email}>Logged in as: {user.email}</h1>
   {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-bold mb-2">Your order history is empty!</h2>
          <p className="text-gray-600 mb-4">Looks like you haven't placed any orders yet.</p>
          <Link href="/">
            <p className="text-blue-500 hover:text-blue-700 transition duration-200">
              Start shopping and place your first order today!
            </p>
          </Link>
        </div>
      ):(
        <div style={styles.ordersContainer}>
        {orders.map((order, index) => (
          <div key={index} className='bg-yellow-100' style={styles.orderCard}>
            <h2 className='font-bold' style={styles.orderTitle}>Delivery Date: {handleCheckDeliveryDate(order.pincode,new Date(order.date))}</h2>
            <p><strong>Ordered by:</strong> {order.firstName} {order.lastName}</p>
            <p><strong>Address:</strong> {order.address}, {order.city}, {order.state}-{order.pincode}</p>
            <p><strong>Order Date:</strong> {new Date(order.date).toDateString()}</p>
            <p><strong>Order Amount:</strong> ₹{order.amount}</p>
            <div style={styles.itemsContainer}>
              {order.items.map((item, idx) => (
                <Link href={`/${item.category}/${item.productId}`} key={idx} style={styles.itemCard} className='bg-blue-100 hover:bg-white'>
                  <img src={item.image} alt={item.heading} style={styles.itemImage}  />
                  <div>
                    <h3 className='font-bold text-green-900' style={styles.itemHeading}>{item.heading}</h3>
                    <p className='font-bold text-gray-200 ' style={styles.itemPrice}>₹{item.price}   Size:{item.size}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      )}
     
    </div>
  )
}


const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    image: {
      width: '100px',
      marginBottom: '20px',
    },
    email: {
      textAlign: 'center',
    },
    ordersContainer: {
      marginTop: '20px',
      width:'75%',
      marginLeft:'150px'
    },
    orderCard: {
      border: '2px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    

    },
    orderTitle: {
      marginBottom: '10px',
    },
    itemsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '10px',
    },
    itemCard: {
      border: '1px solid green',
      borderRadius: '5px',
      padding: '10px',
      margin: '5px',
      display: 'flex',
      alignItems: 'center',
    },
    itemImage: {
      width: '50px',
      height: '50px',
      marginRight: '10px',
    },
    itemHeading: {
      margin: '0',
      fontSize: '16px',
      
    },
    itemPrice: {
      color: '#666',
      fontSize: '14px',
    },
  };

export default profile
