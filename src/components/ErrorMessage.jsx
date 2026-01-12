import { FaExclamationTriangle, FaArrowLeft, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ErrorMessage({ message, onRetry }) {
  const navigate = useNavigate();
  
  const isNotFound = message?.toLowerCase().includes("not found");
  const isRateLimited = message?.toLowerCase().includes("too many requests");

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

return (
    <div className="fixed inset-0 min-h-screen w-full flex justify-center items-center px-4 bg-[#0b0f1a] z-[9999]">
      <div className="bg-gray-800/40 border border-green-900/30 p-10 rounded-2xl text-center shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-md w-full relative">
        
        <div className="mb-6">
          <FaExclamationTriangle className="text-red-600 text-5xl mx-auto drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
        </div>
        
        <h2 className="text-green-400 text-2xl font-bold mb-3 tracking-tight">
          {isNotFound ? "Page or Content not found" : isRateLimited ? "Slow Down!" : "Network Issue"}
        </h2>
        
        <p className="text-gray-400 mb-10 leading-relaxed font-medium">
          {message || "Something went wrong."}
        </p>

        <div className="flex flex-col gap-4">
          {isNotFound ? (
            <button 
              onClick={handleGoHome}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg"
            >
              <FaArrowLeft className="text-sm" /> Back to Movies
            </button>
          ) : (
            <>
              <button 
                onClick={onRetry}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-red-700/80 hover:bg-red-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg"
              >
                <FaSync className="text-sm" /> Try Again
              </button>
              
              {!isRateLimited && (
                <button 
                  onClick={handleGoHome}
                  className="text-gray-500 hover:text-green-500 text-sm font-semibold transition-colors mt-2"
                >
                  Return to Home
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
};