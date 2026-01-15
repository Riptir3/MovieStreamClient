import { useState, useEffect } from "react";
import { FiX, FiPlayCircle, FiImage } from "react-icons/fi";

export default function MovieFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const categories = ["Action", "Comedy", "Drama", "Horror", "SciFi", "Thriller", "Documentary"];

  const emptyMovie = {
    title: "",
    description: "",
    category: categories[0],
    posterUrl: "",
    videoUrl: "",
    director: "",
    releaseYear: new Date().getFullYear(),
  };

  const [movie, setMovie] = useState(emptyMovie);

  useEffect(() => {
    if (isOpen) {
      setMovie(initialData ? { ...initialData } : emptyMovie);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl w-full max-w-4xl shadow-2xl text-white max-h-[95vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {initialData?.id ? "Edit Movie" : "Add New Movie"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 uppercase font-semibold">Title</label>
                <input
                  className="p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none transition-colors"
                  value={movie.title}
                  required
                  onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 uppercase font-semibold">Year</label>
                <input
                  type="number"
                  className="p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none"
                  value={movie.releaseYear}
                  required
                  onChange={(e) => setMovie({ ...movie, releaseYear: parseInt(e.target.value) || "" })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 uppercase font-semibold">Director</label>
                <input
                  className="p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none"
                  value={movie.director}
                  required
                  onChange={(e) => setMovie({ ...movie, director: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 uppercase font-semibold">Category</label>
                <select
                  className="p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none cursor-pointer"
                  value={movie.category}
                  onChange={(e) => setMovie({ ...movie, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase font-semibold font-semibold">Poster URL</label>
              <input
                type="url"
                className="p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none text-sm"
                placeholder="https://..."
                value={movie.posterUrl}
                required
                onChange={(e) => setMovie({ ...movie, posterUrl: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase font-semibold">Video URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none text-sm"
                  placeholder="https://..."
                  value={movie.videoUrl}
                  required
                  onChange={(e) => setMovie({ ...movie, videoUrl: e.target.value })}
                />
                {movie.videoUrl && (
                  <a href={movie.videoUrl} target="_blank" rel="noreferrer" className="p-2 bg-blue-600 hover:bg-blue-500 rounded transition-colors" title="Test Link">
                    <FiPlayCircle size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase font-semibold">Description</label>
              <textarea
                className="p-2 bg-gray-800 border border-gray-700 rounded h-24 focus:border-green-500 outline-none resize-none text-sm"
                value={movie.description}
                onChange={(e) => setMovie({ ...movie, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-8 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold shadow-lg shadow-green-900/20">
                Save
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center justify-center border-l border-gray-800 pl-8">
            <span className="text-xs text-gray-500 uppercase font-semibold mb-4 self-start">Live Preview</span>
            <div className="relative w-64 h-96 bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex items-center justify-center group">
              {movie.posterUrl ? (
                <img 
                  src={movie.posterUrl} 
                  alt="Poster Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=Invalid+Image+URL'}
                />
              ) : (
                <div className="flex flex-col items-center text-gray-600">
                  <FiImage size={48} className="mb-2" />
                  <p className="text-xs">No image provided</p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="font-bold truncate">{movie.title || "Movie Title"}</p>
                <p className="text-xs text-yellow-500">{movie.category} • {movie.releaseYear}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center max-w-[200px]">
              This is how the card will look in the movie list.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}