import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllMovie, createMovieRequest } from "../services/MovieService";
import { getFavorites, addFavorite, removeFavorite } from "../services/FavoriteService";
import { useAxios } from "../api/axios";
import { UserContext } from "../contexts/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function MoviesPage() {
  const { logout, user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDirector, setRequestDirector] = useState("");
  const [requestReleaseYear, setRequestReleaseYear] = useState("");
  const [requestComment, setRequestComment] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await getAllMovie(axios);
        setMovies(response);

        const favResponse = await getFavorites(axios);
        setFavorites(favResponse.map(f => f));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const toggleFavorite = async (movieId) => {
    try {
      if (favorites.includes(movieId)) {
        await removeFavorite(axios, movieId);
        setFavorites(prev => prev.filter(id => id !== movieId));
      } else {
        await addFavorite(axios, movieId);
        setFavorites(prev => [...prev, movieId]);
      }
    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isNewMovie = (createdAt) => {
    const movieDate = new Date(createdAt);
    const today = new Date();
    return movieDate.toDateString() === today.toDateString();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading movies...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-400 text-lg">
        Error loading movies!
      </div>
    );

  const categoryColors = {
    Action: "bg-red-700 text-red-100",
    Comedy: "bg-yellow-600 text-yellow-900",
    Drama: "bg-blue-700 text-blue-100",
    Horror: "bg-gray-800 text-gray-200",
    "Sci-Fi": "bg-purple-700 text-purple-100",
  };

  const categories = ["All", ...Object.keys(categoryColors)];

  const filteredMovies = movies.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.director?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || categoryFilter === "Favorites"
        ? true
        : m.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <nav className="flex justify-between items-center p-6 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-green-400">Movies</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full font-semibold shadow-md">
              Welcome, {user}!
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={() =>
            setCategoryFilter(categoryFilter === "Favorites" ? "All" : "Favorites")
          }
          className="ml-auto p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          Show Favorites
        </button>

        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Request Movie
        </button>
      </div>

      <div className="p-6 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {currentMovies
            .filter((m) => categoryFilter !== "Favorites" || favorites.includes(m.id))
            .map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-xl overflow-hidden relative"
              >
                <div className="relative">
                  <Link to={`/movies/${movie.id}`}>
                    <div className="w-full aspect-[2/3]">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-t-xl"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  <motion.button
                    onClick={() => toggleFavorite(movie.id)}
                    className="absolute top-3 right-3 text-red-500 text-2xl z-10"
                    whileTap={{ scale: 1.4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {favorites.includes(movie.id) ? (
                      <FaHeart className="drop-shadow-lg" />
                    ) : (
                      <FaRegHeart className="drop-shadow-lg" />
                    )}
                  </motion.button>

                  {isNewMovie(movie.createdAt) && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
                      NEW
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-white line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">Director: {movie.director}</p>
                  <p className="text-gray-300 text-sm">Year: {movie.releaseYear}</p>

                  <span
                    className={`inline-block text-white text-xs px-2 py-1 rounded-full mt-1 transition-colors duration-300 ${
                      categoryColors[movie.category] ||
                      "bg-green-700 text-green-100"
                    } hover:brightness-125`}
                  >
                    {movie.category}
                  </span>

                  <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                    {movie.description}
                  </p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center space-x-2 py-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600"
        >
          Next
        </button>
      </div>

      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-xl border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Request a Movie</h2>

            {requestSuccess ? (
              <p className="text-green-400 font-semibold">{responseMessage}</p>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Movie title"
                  value={requestTitle}
                  required
                  onChange={(e) => setRequestTitle(e.target.value)}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />

                <input
                  type="text"
                  placeholder="Director"
                  value={requestDirector}
                  required
                  onChange={(e) => setRequestDirector(e.target.value)}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />

                <input
                  type="number"
                  placeholder="Release year"
                  value={requestReleaseYear}
                  required
                  onChange={(e) => setRequestReleaseYear(e.target.value)}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />

                <textarea
                  placeholder="Why should we add this movie?"
                  value={requestComment}
                  onChange={(e) => setRequestComment(e.target.value)}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white h-24"
                />

                <button
                  onClick={async () => {
                    try {
                      const response = await createMovieRequest(axios, {
                        title: requestTitle,
                        director: requestDirector,
                        releaseYear: parseInt(requestReleaseYear),
                        comment: requestComment,
                      });
                      setRequestSuccess(true);
                      setResponseMessage(response.message);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  className="w-full mb-2 p-2 rounded bg-blue-600 hover:bg-blue-700"
                >
                  Send Request
                </button>
              </>
            )}

            <button
              onClick={() => {
                setIsRequestModalOpen(false);
                setRequestSuccess(false);
                setRequestTitle("");
                setRequestDirector("");
                setRequestReleaseYear("");
                setRequestComment("");
              }}
              className="w-full mt-2 p-2 rounded bg-red-600 hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
