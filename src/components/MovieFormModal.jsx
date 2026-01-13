import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function MovieFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const emptyMovie = {
    title: "",
    description: "",
    category: "",
    posterUrl: "",
    videoUrl: "",
    director: "",
    releaseYear: new Date().getFullYear(),
  };

  const [movie, setMovie] = useState(emptyMovie);

  // Ha változik az initialData (pl. megnyitunk egy másik filmet szerkesztésre), frissítjük a state-et
  useEffect(() => {
    if (initialData) {
      setMovie(initialData);
    } else {
      setMovie(emptyMovie);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {initialData ? "Film szerkesztése" : "Új film hozzáadása"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(movie); }}>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none text-white"
              placeholder="Cím"
              value={movie.title}
              required
              onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            />
            <input
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none text-white"
              placeholder="Megjelenési év"
              type="number"
              value={movie.releaseYear}
              required
              onChange={(e) => setMovie({ ...movie, releaseYear: parseInt(e.target.value) })}
            />
          </div>

          <input
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 outline-none text-white"
            placeholder="Rendező"
            value={movie.director}
            required
            onChange={(e) => setMovie({ ...movie, director: e.target.value })}
          />

          <textarea
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-24 focus:border-green-500 outline-none text-white"
            placeholder="Leírás"
            value={movie.description}
            required
            onChange={(e) => setMovie({ ...movie, description: e.target.value })}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold transition-colors"
            >
              {initialData ? "Mentés" : "Létrehozás"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}