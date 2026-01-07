import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorMessage({message}) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 border border-red-500/50 p-8 rounded-2xl text-center max-w-sm shadow-2xl">
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-5xl animate-bounce" />
        </div>
        
        <h2 className="text-red-500 text-2xl font-bold mb-2">Ups...</h2>
        <p className="text-gray-300 mb-6">
          {message}
        </p>
        
        <button 
          onClick={handleRefresh}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-900/20"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}