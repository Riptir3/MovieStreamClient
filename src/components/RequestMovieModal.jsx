import { useState } from "react";
import { createMovieRequest } from "../services/MovieService";
import { FaPaperPlane, FaTimes, FaCheckCircle } from "react-icons/fa";

export default function RequestMovieModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    releaseYear: "",
    comment: ""
  });
  
  const [status, setStatus] = useState({ loading: false, success: false, message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true, message: "" });
    try {
      const response = await createMovieRequest({
        ...formData,
        releaseYear: parseInt(formData.releaseYear)
      });
      
      setStatus({ 
        loading: false, 
        success: true, 
        message: response.message || "Request sent successfully!" 
      });

      // AUTOMATIKUS BEZÁRÁS 1 MÁSODPERC UTÁN
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (err) {
      setStatus({ loading: false, success: false, message: err });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[10000] p-4">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-green-900/30 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative">
        
        {/* Bezáró gomb - csak akkor látszik, ha még nincs kész a küldés */}
        {!status.success && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <FaTimes size={20} />
          </button>
        )}

        <h2 className="text-2xl font-bold mb-2 text-green-400">Request a Movie</h2>
        
        {status.success ? (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
            <p className="text-white text-xl font-bold">{status.message}</p>
            <p className="text-gray-500 text-sm mt-2 italic text-center">Closing in a second...</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6 text-sm italic">Tell us what's missing from the library!</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <input 
                  name="title" 
                  placeholder="Movie title *" 
                  required 
                  onChange={handleChange} 
                  className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-500" 
                />
                <input 
                  name="director" 
                  placeholder="Director *" 
                  required 
                  onChange={handleChange} 
                  className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-500" 
                />
                <input 
                  name="releaseYear" 
                  type="number" 
                  placeholder="Release year *" 
                  required 
                  onChange={handleChange} 
                  className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-500" 
                />
                <textarea 
                  name="comment" 
                  placeholder="Why should we add this? (Optional)" 
                  onChange={handleChange} 
                  className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all h-28 resize-none placeholder:text-gray-500" 
                />
              </div>

              {status.message && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  <p className="text-red-400 text-sm text-center font-medium">{status.message}</p>
                </div>
              )}
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={status.loading} 
                  className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status.loading ? "Sending..." : (
                    <>
                      <FaPaperPlane className="text-xs" /> Send Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}