import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessCheckout() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/about");
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 m-4 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <svg
              width="80"
              height="80"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-scale-in"
            >
              <circle cx="32" cy="32" r="32" fill="#22C55E" />
              <path
                d="M20.7539 33.3328L27.5054 40.0843L43.3085 24.2812"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </div>

          <h1 className="mt-2 mb-3 font-bold text-2xl">
            THANK YOU FOR YOUR ORDER
          </h1>

          <p className="text-gray-500 mb-8">
            You will receive a confirmation email shortly
          </p>

          <div className="w-full mb-6 bg-gray-100 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full animate-progress"></div>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Redirecting to homepage in 3 seconds...
          </p>

          <button
            onClick={() => navigate("/about")}
            className="w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
