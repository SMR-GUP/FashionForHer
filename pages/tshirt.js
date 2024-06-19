import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const tshirt = () => {
  const [tshirts, setTshirts] = useState([]);

  useEffect(() => {
    const fetchTshirts = async () => {
      try {
        const response = await fetch("/api/getTshirt");
        const data = await response.json();
        setTshirts(data.tshirts);
      } catch (error) {
        console.error("Error fetching t-shirts:", error);
      }
    };

    fetchTshirts();
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div>
          <h1 className="text-black text-3xl flex items-center justify-center mb-5 mt-3">
            T-Shirts
          </h1>
        </div>
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {tshirts.map((tshirt) => (
              <div
                key={tshirt._id}
                className="lg:w-1/5 md:w-1/2 p-3 w-full shadow-lg m-7"
              >
                <Link
                  href={`/tshirt/${tshirt._id}`}
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-top w-full h-full block"
                    src={tshirt.image}
                  />
                </Link>
                <div className="mt-4">
                  <div class="mt-4">
                    <h3 class="text-blue-500 text-md tracking-widest title-font font-medium mb-1">
                      {tshirt.heading}
                    </h3>

                    <p class="mt-1 font-bold text-lg">₹{tshirt.price}</p>
                    <p class="text-gray-500 mt-1 font-serif ">
                      XS , S , M , L , XL
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default dynamic(() => Promise.resolve(tshirt), { ssr: false });
