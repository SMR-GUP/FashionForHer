import React from 'react'
import { useRouter} from 'next/router'
import { FaShoppingBag } from 'react-icons/fa';
import { useState ,useEffect} from 'react';
import { getUserFromToken } from '@/utils/auth';
import getPincodeDeliveryDays from '@/utils/pincodeDelivery';




const Post = () => {


   const router=useRouter()
   const { slug } = router.query;

   const [footwear, setFootwear] = useState(null);
   const [user, setUser] = useState(null);
   const [selectedSize, setSelectedSize] = useState('4UK');

   const [pincode, setPincode] = useState('');
   const [deliveryDate, setDeliveryDate] = useState(null);
   const [clicked, setClicked] = useState(false);
   const[category,setCategory]=useState('footwear');
   const [isPink, setIsPink] = useState('');
   let idOfUser;

 
   const handleClick = async(event) => {
    event.preventDefault();
   if(isPink)
    {
      //remove from wishlist-- i will store only category and id.
      try{
          const res=await fetch('/api/removeFromWishlist',{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              category:'footwear',
              productId:slug,
              userId:user._id
            })
          })

      const data = await res.json();
      setIsPink(false);

        }
        catch(error){
          alert('Error deleting from wishlist');
        }

    }
    else
    {
      //add to wishlist
      if(!user)
        {
          alert('Login to add items to wishlist');
          return;
        }
      try{
          const res=await fetch('/api/addToWishlist',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              category:'footwear',
              productId:slug,
              userId:user._id
            })
          })

      const data = await res.json();
      setIsPink(true);
        }
        catch(error){
          alert('Error adding in wishlist');
        }
    
    }
  };

   const handleCheckDeliveryDate = () => {
     const days = getPincodeDeliveryDays(pincode);
console.log(days);
     if(days===0)
      {
      setDeliveryDate(null);
      return;
      }
      setClicked(true);
     var date = new Date();
     date.setDate(date.getDate() + days);
     setDeliveryDate(date);
 };

   useEffect(() => {
    const userInfo = getUserFromToken();
    if(userInfo!==null)
      {
    setUser(userInfo.user);
      }
  }, []);


  useEffect(()=>{
    const fetchWishListContains= async()=>{
        try{

          const userInfo = getUserFromToken();
    if(userInfo!==null)
      {
    idOfUser=userInfo.user._id;
      }
      else
      return;

              const res=await fetch('/api/wishlistCheck',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                

                body:JSON.stringify({
                  userId:idOfUser,
                  productId:slug,
                  category:category
                })
              })

              const data=await res.json();
              if(data.exists)
                {
                  setIsPink(true);
                }
                else
                {
                  setIsPink(false);

                }
        }
        catch(error){
          console.log(error);
        }
    }

    if(slug){
      fetchWishListContains();
    }
},[slug],idOfUser);

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
            heading: footwear.heading,
            size: selectedSize,
            image: footwear.image,
            price:footwear.price,
            category:'footwear',
            productId:slug
            //heading, image,size, price
          }),
        });

        const data = await response.json();

        if (response.ok) {
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
    const fetchfootwearDetails = async () => {
      try {
        const response = await fetch(`/api/getFootwear?id=${slug}`);
        const data = await response.json();
        setFootwear(data.footwear);
      } catch (error) {
        console.error('Error fetching footwear details:', error);
      }
    };

    if (slug) {
      fetchfootwearDetails();
    }
  }, [slug]);

  if (!footwear) {
    return <div>Loading...</div>;
  }


    return(

    <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-10 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-top rounded" src={footwear.image}/>
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">E Shop</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{footwear.heading}</h1>
          <div class="flex mb-4">
          </div>
          <p class="leading-relaxed">{footwear.description}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            <div class="flex">
              <span class="mr-3">Color</span>
              <button className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none" style={{ backgroundColor: `#${footwear.color}` }}></button>
            </div>
            <div class="flex ml-6 items-center">
              <span class="mr-3">Size</span>
              <div class="relative">
                <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                 value={selectedSize}
                 onChange={handleSizeChange}
                >
                  <option>4UK</option>
                  <option>5UK</option>
                  <option>6UK</option>
                  <option>7UK</option>
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
            <span class="title-font font-medium text-2xl text-gray-900">₹{footwear.price}</span>
            <button onClick={handleCartClick} className="flex items-center ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
      <FaShoppingBag className="mr-2" /> Add to Cart
    </button>         
    <button
      className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4 ${
        isPink ? 'bg-pink-100 text-pink-600' : 'bg-gray-200 text-gray-500'
      }`}
      onClick={handleClick}
    >
      <svg
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
      </svg>
    </button>
          </div>
          <div>

<div class="flex mt-7">
<input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)}  placeholder="Enter pincode" class="w-72 p-2 pl-10 text-gray-700 border border-gray-400 text-center rounded" />
<button     onClick={handleCheckDeliveryDate} class="w-52 bg-orange-500 hover:bg-orange-700 text-white  pl-2 pr-2 rounded ml-2">
📅 Check Delivery Date
</button>

</div>
{clicked && (
deliveryDate === null ? (
<p className="mt-2 text-blue-800 text-center font-mono font-bold text-lg">Sorry, we are not serviceable in your area.</p>
) : (
<p className="mt-2 text-green-600 text-center font-mono font-bold text-lg">
  Order Now to get it by {deliveryDate.toDateString()} ⭐
</p>
)
)}

</div>
        </div>
      </div>
    </div>
  </section>
    )
}

export default Post
