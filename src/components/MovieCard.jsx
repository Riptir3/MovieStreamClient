import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const categoryColors = {
  Action: "bg-red-700 text-red-100",
  Comedy: "bg-yellow-600 text-yellow-900",
  Drama: "bg-blue-700 text-blue-100",
  Horror: "bg-gray-800 text-gray-200",
  "Sci-Fi": "bg-purple-700 text-purple-100",
}
export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const isNew = new Date(movie.createdAt).toDateString() === new Date().toDateString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 rounded-xl overflow-hidden relative shadow-lg"
    >
      <div className="relative aspect-[2/3]">
        <Link to={`/movies/${movie.id}`}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Link>
        
        <motion.button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 text-red-500 text-2xl z-10"
          whileTap={{ scale: 1.4 }}
        >
          {isFavorite ? <FaHeart className="drop-shadow-lg" /> : <FaRegHeart className="drop-shadow-lg" />}
        </motion.button>

        {isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
            NEW
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm italic">{movie.director}, {movie.releaseYear}</p>
        
        <span className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${categoryColors[movie.category] || "bg-green-700"}`}>
          {movie.category}
        </span>
        
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{movie.description}</p>
      </div>
    </motion.div>
  );
}