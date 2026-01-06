import { useState } from "react";
import { createMovieRequest } from "../services/MovieService";

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
    setStatus({ ...status, loading: true });
    try {
      const response = await createMovieRequest({
        ...formData,
        releaseYear: parseInt(formData.releaseYear)
      });
      setStatus({ loading: false, success: true, message: response.message });
    } catch (err) {
      setStatus({ loading: false, success: false, message: "Error sending request." });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-green-400">Request a Movie</h2>

        {status.success ? (
          <div className="text-center py-4">
            <p className="text-green-400 font-semibold mb-4">{status.message}</p>
            <button onClick={onClose} className="w-full p-2 rounded bg-green-600 hover:bg-green-700 transition">Great!</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="title" placeholder="Movie title" required onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
            <input name="director" placeholder="Director" required onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
            <input name="releaseYear" type="number" placeholder="Release year" required onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
            <textarea name="comment" placeholder="Why should we add this?" onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white h-24" />
            
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={onClose} className="flex-1 p-2 rounded bg-gray-600 hover:bg-gray-500">Cancel</button>
              <button type="submit" disabled={status.loading} className="flex-1 p-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                {status.loading ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}