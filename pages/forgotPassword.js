import { useState } from "react";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/forgotPasswordOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.status === 400) {
        setLoading(false);

        alert("User does not exist");
      }
      if (response.ok) {
        setLoading(false);
        alert("OTP sent to your email");
        setShowOtpForm(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setShowResetForm(true);
        setShowOtpForm(false);
      } else {
        alert("Invalid Otp");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.status === 200) {
        alert("Password reset successfully");
        router.push("/login");
      } else {
        alert("Error while resetting password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-forgot">
      <div className="flex items-center bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <img
          src="/password.png"
          alt="Description of image"
          className="w-1/2 h-auto rounded-lg"
        />

        <div className="w-1/2 p-4">
          {!showOtpForm && !showResetForm && (
            <form onSubmit={handleEmailSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Forgot Password
              </h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Send OTP
              </button>
              {loading && (
                <div className="w-full bg-gray-200 rounded mt-4">
                  <div
                    className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded"
                    style={{ width: "50%" }}
                  >
                    Sending...
                  </div>
                </div>
              )}
            </form>
          )}

          {showOtpForm && (
            <form onSubmit={handleOtpSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Enter OTP
              </h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Verify OTP
              </button>
            </form>
          )}

          {showResetForm && (
            <form onSubmit={handlePasswordReset}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Reset Password
              </h2>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
