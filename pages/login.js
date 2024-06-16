import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken, getToken } from '../utils/auth';



const Login = () => {

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const router=useRouter();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response= await fetch(`/api/getUser`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
    });

   if(response.status===404){
    alert('Account does not exists');
   }

   if(response.status===200){
    
        const data= await response.json();
        const token = data.token;
        setToken(token);
        // const retrievedToken = getToken();
        // console.log('Retrieved token:', retrievedToken);
      router.push('/');
  
   }

   if(response.status===400){
    alert('Invalid password');
   }

  }
    catch(error){
      
          console.log("Error  ",error);
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
       <div className="ml-20 max-w-md">
          {/* Left side with the image */}
          <img src="/harry-cunningham-7qCeFo19r24-unsplash.jpg" alt="login image" className="w-full h-full object-cover rounded-lg" />
        </div>

        <div className="w-1/2 p-8">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
       
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back :)</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link href='/register'
            onClick={() => console.log('Navigate to register')}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Register here
          </Link>
        </p>
        <p className="text-center mt-4">
          Forgot Password?{' '}
          <Link href='/forgotPassword'
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Reset Password here
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
