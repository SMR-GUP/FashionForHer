import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaTimes, FaTrash } from 'react-icons/fa';
import { useState , useEffect} from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { getUserFromToken } from '../utils/auth';
import { removeToken} from '../utils/auth';
import { FaUserCircle } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';









const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const userInfo = getUserFromToken();
    if(userInfo!==null)
      {
    setUser(userInfo.user);
    console.log("User dataa ",userInfo);
      }
  }, []);


  //setting products

  useEffect(()=>{
    const fetchCartDetails = async () => {

      console.log("calling fetch cart");
      if (!user) 
        {
          console.log("No userr sorry return now");
        return;
        }

      try {
        const response = await fetch(`/api/getCart?id=${user._id}`);
        const data = await response.json();
        console.log("Data from Navar Cart ", data.user.cart);
        if (response.ok) {
          setProducts(data.user.cart);
        } else {
          console.error('Error fetching cart details', data);
        }
      } catch (error) {
        console.error('Error fetching cart details', error);
      } finally {

      }
    };

    fetchCartDetails();
  }, [user]);
  



  
  


  const openSidebar = () =>{
    if(!user)
      {
          alert('Login to view your cart!');
      }

      else
      {
    setIsSidebarOpen(true);

      }
  } 
  const closeSidebar = () => setIsSidebarOpen(false);

  const increaseQuantity = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    setProducts(newProducts);
  };

  const decreaseQuantity = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
      setProducts(newProducts);
    }
  };

  const logout = () => {

    if(window.confirm('Are you sure you want to logout?'))
    {
    removeToken();
    setUser(null);
    window.location.reload();
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await fetch('/api/removeFromCart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:user._id,
          toBeDeleted:id
         }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove product from state
        setProducts((products) => products.filter(product => product.id !== id));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  };



  const clearCart=async()=>{
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
        setProducts([]);
      } else {
        console.error(data.message);
      }
    }

    catch (error) {
      console.error('Failed to clear cart');
    }
  }


  const router = useRouter();


  return (
    <div>
      <header class="text-gray-600 body-font py-3 ">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center shadow-lg">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <Link href="/" class="ml-3 text-xl">
              EShop
            </Link>
          </a>
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className={`mr-5 font-mono text-xl text-purple-700 font-bold border-2 border-white rounded-full pl-3 pr-3 bg-indigo-100  ${router.pathname === '/tshirt' ? 'text-green-700' : 'hover:text-red-900 text-xl'}`} href="/tshirt">
        
      T-Shirts
      </Link>
      <Link className={`mr-5 font-mono text-xl text-purple-700 font-bold border-2 border-white rounded-full pl-3 pr-3 bg-indigo-100  ${router.pathname === '/dress' ?'text-green-700': 'hover:text-red-900 text-xl'}`} href="/dress">
        Dresses
      </Link>
      <Link className={`mr-5 font-mono text-xl text-purple-700 font-bold border-2 border-white rounded-full pl-3 pr-3 bg-indigo-100  ${router.pathname === '/footwear' ? 'text-green-700' : 'hover:text-red-900 text-xl'}`} href="/footwear">
        Footwear
      </Link>
      <Link className={`mr-5 font-mono text-xl text-purple-700 font-bold border-2 border-white rounded-full pl-3 pr-3 bg-indigo-100 ${router.pathname === '/bottoms' ? 'text-green-700' : 'hover:text-red-900 text-xl'}`} href="/bottoms">
        Bottom Wear
      </Link>
          </nav>
          {/* <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Cart
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button> */}
   
      <div className="icons-container absolute top-19 right-10 flex">
        {user ? (
        // <div className="user-info mr-9 text-black">
        //   {user.email}
        //   <button
        //     onClick={logout}
        //     className="logout-button ml-4 cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-800"
        //   >
        //     Logout
        //   </button>
        // </div>
        <div className="absolute top-19 right-10 flex user-info-container mr-9 text-black">
          <div className="relative group cursor-pointer flex items-center">
            <FaUserCircle size={37} className="mb-2 flex text-black-500 " />
            <div className="absolute top-full mt-2 hidden group-hover:block bg-white text-black p-2 rounded shadow-lg">
              {user.email}
            </div>
          </div>
          <button
            onClick={logout}
            className="logout-button ml-4 cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-800"
          >
            Logout
          </button>
        </div>
        
        
      ) : (
        <Link href="/login" className="login mr-9 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Login
        </Link>
      )}
      <div className="cart text-indigo-500 mr-7 text-4xl">
        <FaShoppingCart onClick={openSidebar} className="cursor-pointer" />
      </div>
     
    </div>
        </div>
      </header>
      <div
        className={`fixed top-0 right-0 w-2/5 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
        <h2 className="text-2xl font-semibold flex items-center text-black">
          <FaShoppingCart className="mr-2" /> Shopping Cart
        </h2>
                  <button onClick={closeSidebar}>
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto  flex-grow">
          {products.length===0 ? (

 <div className="flex flex-col items-center mt-9">
 <FaShoppingBag className="text-center text-orange-400 text-4xl mb-4 " />

 <p className="text-2xl font-bold text-red-600 font-mono">Your cart seems a bit lonely😥</p>
 <p className="text-2xl font-bold text-green-700 font-mono mb-2">Let's Fill it Up 😊👗</p>
</div>

) : (
            <ul>
            {products.map((product, index) => (
              <li key={index} className="mb-8 flex items-center ">
                
                <Link href={`/${product.category}/${product.productId}`}>
                <img src={product.image} alt={product.heading} className="w-32 h-32 object-cover mr-6 rounded-lg shadow-md" />

                </Link>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-indigo-600">{product.heading}</h3>
                  <p className="text-lg text-gray-600">Size: <span className="font-medium">{product.size}</span></p>
                  <p className="text-xl font-bold text-green-500 mt-2">Price: ₹{product.price}</p>
                  <button onClick={() => removeProduct(product.id)} className="text-xl text-black hover:text-gray-500 ">
  <FaTrash />
</button>
                </div>
              </li>
            ))}
          </ul>
          )}
        <div className="p-4 border-t flex-shrink-0">
          <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
            Checkout
          </button>
          <button onClick={() => clearCart()} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-300 mt-3">
            Clear Cart
          </button>
        </div>
        </div>

      </div>
    </div>
  );
};



export default dynamic (() => Promise.resolve(Navbar), {ssr: false});
