import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/send-verification-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 404) {
      alert("Account with this email already exists!");
      return;
    }

    if (response.ok) {
      setVerificationSent(true);
      alert("Verification email sent");
    } else {
      // Handle error
      alert("Error sending verification email");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, password }),
    });

    if (response.ok) {
      // Registration successful
      alert("Registration successful");
      router.push("/login");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="p-20 min-h-screen flex items-center justify-end bg-login ">
      <div className="mr-10 bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome To FashionForHer!
        </h1>
        {verificationSent ? (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-semibold mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>
          </form>
        )}
        <p className="text-lg text-center mt-4 text-black-500 font-semibold">
          {verificationSent
            ? "Check your email for the OTP."
            : "Already have an account? "}
          {!verificationSent && (
            <Link
              href={"/login"}
              className="text-lg text-indigo-800 font-bold hover:underline focus:outline-none"
            >
              Login here
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default Register;
