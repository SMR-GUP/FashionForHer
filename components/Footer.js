import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const Footer = () => {
  return (
    <div>
      <footer class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image
        src="/logo.jpg"
        alt="Logo"
        width={40}
        height={40}
        href='/'
        className="h-15 bg-indigo-400 rounded-full"
      />
              <Link href="/" class="ml-1 text-xl text-purple-700">
                FashionForHer
              </Link>
            </a>
            <p class="mt-2  text-purple-700 text-md">
              Style Simplified: Anywhere Anytime
            </p>
          </div>
          <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-purple-500 tracking-widest text-xl mb-3">
                CATEGORIES
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <Link
                    href="/tshirt"
                    class="text-lg text-purple-700 hover:text-pink-800 hover:underline"
                  >
                    T Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/footwear"
                    class="text-lg text-purple-700 hover:text-pink-800 hover:underline "
                  >
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bottoms"
                    class="text-lg text-purple-700 hover:text-pink-800 hover:underline"
                  >
                    Bottom Wear
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dress"
                    class="text-lg text-purple-700 hover:text-pink-800 hover:underline"
                  >
                    Dresses
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div class="bg-gray-100">
          <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class="text-gray-500 text-sm text-center sm:text-left">
              © 2024 FashionForHer   All rights reserved
            </p>
            <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
             
             
             
              <a class="ml-3 text-gray-500">
              <Image
        src="/logo.jpg"
        alt="Logo"
        width={20}
        height={20}
        href='/'
        className="h-15 bg-indigo-400 rounded-full"
      />
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
