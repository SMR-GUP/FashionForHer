import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const bottoms = () => {
  const [bottomwear, setBottomwears] = useState([]);

  useEffect(() => {
    const fetchBottomwears = async () => {
      try {
        const response = await fetch("/api/getBottomwear");
        const data = await response.json();

        setBottomwears(data.bottomwears);
      } catch (error) {
        console.error("Error fetching bottomwear:", error);
      }
    };

    fetchBottomwears();
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div>
          <h1 className="text-black text-3xl flex items-center justify-center mb-5 mt-3">
            BottomWear
          </h1>
        </div>
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap -m-4">
            {bottomwear.map((bottomwear) => (
              <div
                key={bottomwear._id}
                className="lg:w-1/5 md:w-1/2 p-3 w-full shadow-lg m-7"
              >
                <Link
                  href={`/bottomwear/${bottomwear._id}`}
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-top w-full h-full block"
                    src={bottomwear.image}
                  />
                </Link>
                <div className="mt-4">
                  <div class="mt-4">
                    <h3 class="text-blue-500 text-md tracking-widest title-font font-medium mb-1">
                      {bottomwear.heading}
                    </h3>

                    <p class="mt-1 font-bold text-lg">₹{bottomwear.price}</p>
                    <p class="text-gray-500 mt-1 font-serif">
                      26 , 28 , 30 , 32 , 34
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

export default dynamic(() => Promise.resolve(bottoms), { ssr: false });
