import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllMovie } from "../services/MovieService";
import { useAxios } from "../api/axios";
import { UserContext } from "../contexts/UserContext";

export default function MoviesPage() {
  const { setToken } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const axios = useAxios();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await getAllMovie(axios);
        setMovies(response);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
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
    "Action": "bg-red-700 text-red-100",
    "Comedy": "bg-yellow-600 text-yellow-900",
    "Drama": "bg-blue-700 text-blue-100",
    "Horror": "bg-gray-800 text-gray-200",
    "Sci-Fi": "bg-purple-700 text-purple-100"
  };

  const categories = ["All", ...Object.keys(categoryColors)];

  const filteredMovies = movies.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <nav className="flex justify-between items-center p-6 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-green-400">Movies</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Logout
        </button>
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
      </div>

      <div className="p-6 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <Link to={`/movies/${movie.id}`}>
              <div className="w-full aspect-[2/3]">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-white line-clamp-1">
                  {movie.title}
                </h3>
                <span
                  className={`inline-block text-white text-xs px-2 py-1 rounded-full mt-1 transition-colors duration-300 ${
                    categoryColors[movie.category] || "bg-green-700 text-green-100"
                  } hover:brightness-125`}
                >
                  {movie.category}
                </span>
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {movie.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
