import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getUserFromToken } from "../utils/auth";

const wishlist = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userInfo = getUserFromToken();
    if (userInfo !== null) {
      setUser(userInfo.user);
    }
  }, []);

  //wishlist fetch

  useEffect(() => {
    const fetchWishListDetails = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await fetch(`/api/getWishlist?id=${user._id}`);
        const data = await response.json();

        if (response.ok) {
          const wishlist = data.user.wishlist;
          setWishlist(wishlist);

          const productDetails = await Promise.all(
            wishlist.map(async (item) => {
              let productResponse;
              if (item.category === "tshirt") {
                productResponse = await fetch(
                  `/api/getTshirt?id=${item.productId}`
                );
              } else if (item.category === "dress") {
                productResponse = await fetch(
                  `/api/getDress?id=${item.productId}`
                );
              } else if (item.category === "bottomwear") {
                productResponse = await fetch(
                  `/api/getBottomwear?id=${item.productId}`
                );
              } else if (item.category === "footwear") {
                productResponse = await fetch(
                  `/api/getFootwear?id=${item.productId}`
                );
              }

              if (productResponse && productResponse.ok) {
                const data = await productResponse.json();
                let product;

                if (item.category === "tshirt") {
                  product = data.tshirt;
                } else if (item.category === "dress") {
                  product = data.dress;
                } else if (item.category === "bottomwear") {
                  product = data.bottomwear;
                } else if (item.category === "footwear") {
                  product = data.footwear;
                }

                return { ...product, category: item.category };
              } else {
                console.error(
                  "Error fetching product details for",
                  item.productId
                );
                return null;
              }
            })
          );

          const validProducts = productDetails.filter(
            (product) => product !== null
          );
          setProducts(validProducts);
        } else {
          console.error("Error fetching wishlist details", data);
        }
      } catch (error) {
        console.error("Error fetching wishlist details", error);
      }
    };

    if (user) {
      fetchWishListDetails();
    }
  }, [user]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 font-mono text-center">
        My Wishlist💖
      </h1>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-bold mb-2">Your wishlist is empty!</h2>
          <p className="text-gray-600 mb-4">
            Looks like you haven't added anything to your wishlist yet.
          </p>
          <Link href="/">
            <p className="text-blue-500 hover:text-blue-700 transition duration-200">
              Explore our products and add your favorites!
            </p>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/${product.category}/${product._id}`}
              className="block"
            >
              <div className="flex items-center border rounded-lg overflow-hidden shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 hover:bg-blue-100">
                <div className="w-1/3">
                  <img
                    src={product.image}
                    alt={product.heading}
                    className="w-full h-auto object-top"
                  />
                </div>
                <div className="ml-4 w-2/3">
                  <h2 className="text-xl font-bold">{product.heading}</h2>
                  <p className="text-lg text-indigo-600 font-bold">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default wishlist;
