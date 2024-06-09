import React from 'react'
import { useRouter} from 'next/router'
import { FaShoppingBag } from 'react-icons/fa';
import { useState ,useEffect} from 'react';
import { getUserFromToken } from '@/utils/auth';




const Post = () => {


   const router=useRouter()
   const { slug } = router.query;

   const [bottomwear, setBottomwear] = useState(null);
   const [user, setUser] = useState(null);
   const [selectedSize, setSelectedSize] = useState('26'); // Default size



   useEffect(() => {
    const userInfo = getUserFromToken();
    if(userInfo!==null)
      {
    setUser(userInfo.user);
      }
  }, []);

  
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };


  const handleCartClick = async () => {
    if (!user) {
      alert('Login to add products in cart!');
    } 
    else {
      try {
        const response = await fetch('/api/addToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            userId: user._id,
            heading: bottomwear.heading,
            size: selectedSize,
            image: bottomwear.image,
            price:bottomwear.price,
            category:'bottomwear',
            productId:slug
            //heading, image,size, price
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Product added', data);
          alert('Product added to cart!');
          window.location.reload();
        } else {
          console.error('Error adding product to cart', data);
          alert('Failed to add product to cart');
        }
      } catch (error) {
        console.error('Error adding product to cart', error);
        alert('An error occurred while adding the product to cart');
      }
    }
  };


   useEffect(() => {
    const fetchbottomwearDetails = async () => {
      try {
        const response = await fetch(`/api/getBottomwear?id=${slug}`);
        const data = await response.json();
        setBottomwear(data.bottomwear);
      } catch (error) {
        console.error('Error fetching bottomwear details:', error);
      }
    };

    if (slug) {
      fetchbottomwearDetails();
    }
  }, [slug]);

  if (!bottomwear) {
    return <div>Loading...</div>;
  }


    return(

    <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-10 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-top rounded" src={bottomwear.image}/>
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">E Shop</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{bottomwear.heading}</h1>
          <div class="flex mb-4">
          </div>
          <p class="leading-relaxed">{bottomwear.description}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            <div class="flex">
              <span class="mr-3">Color</span>
              <button className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none" style={{ backgroundColor: `#${bottomwear.color}` }}></button>
            </div>
            <div class="flex ml-6 items-center">
              <span class="mr-3">Size</span>
              <div class="relative">
                <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                 value={selectedSize}
                 onChange={handleSizeChange}
                >
                  <option>26</option>
                  <option>28</option>
                  <option>30</option>
                  <option>32</option>
                  <option>34</option>

                </select>
                <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">₹{bottomwear.price}</span>
            <button onClick={handleCartClick}  className="flex items-center ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
      <FaShoppingBag className="mr-2" /> Add to Cart
    </button>            <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
    )
}

export default Post
