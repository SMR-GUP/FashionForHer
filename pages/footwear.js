import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';


const footwear = () => {

  const [footwears, setFootwears] = useState([]);

  useEffect(() => {
    const fetchFootwears = async () => {
      try {
        const response = await fetch('/api/getFootwear');
        const data = await response.json();

        setFootwears(data.footwears);
      } catch (error) {
        console.error('Error fetching footwears:', error);
      }
    };

    fetchFootwears();
  }, []);


  return (
    <div>
     <section className="text-gray-600 body-font">
        <div>
          <h1 className="text-black text-3xl flex items-center justify-center mb-5 mt-3">Footwear</h1>
        </div>
        <div className="container px-5  mx-auto">

          <div className="flex flex-wrap -m-4">
          
          {footwears.map((footwear) => (
              <div key={footwear._id} className="lg:w-1/5 md:w-1/2 p-3 w-full shadow-lg m-7">
                <Link href={`/footwear/${footwear._id}`} className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={footwear.image}
                  />
                </Link>
                <div className="mt-4">
                <div class="mt-4">
                 <h3 class="text-blue-500 text-md tracking-widest title-font font-medium mb-1">
                  {footwear.heading}
               </h3>
              
                <p class="mt-1 font-bold text-lg">₹{footwear.price}</p>
                <p class="text-gray-500 mt-1 font-serif">4UK , 5UK , 6UK , 7UK</p>
              </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default dynamic (() => Promise.resolve(footwear), {ssr: false})
