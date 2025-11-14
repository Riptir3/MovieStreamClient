import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAxios } from "../api/axios";
import { getMovie } from "../services/MovieService"
export default function MoviePlayerPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovie(axios,id);
        setMovie(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

const categoryColors = {
        "Action": "bg-red-700 text-red-100",
        "Comedy": "bg-yellow-600 text-yellow-900",
        "Drama": "bg-blue-700 text-blue-100",
        "Horror": "bg-gray-800 text-gray-200",
        "Sci-Fi": "bg-purple-700 text-purple-100",
        "Default": "bg-green-700 text-green-100",
};

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (!movie) return <p className="text-white text-center mt-10">Movie not found!</p>;

return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 text-center mb-2">
        {movie.title}
      </h1>

        <span className={`px-3 py-1 rounded-full text-sm font-semibold mb-6 ${
            categoryColors[movie.category] || categoryColors.Default
        }`}>
            {movie.category}
        </span>

      <div className="relative w-full max-w-5xl h-[300px] md:h-[600px] rounded-xl shadow-2xl border-4 border-green-600 overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.7)]">
        <iframe
          src={movie.videoUrl}
          title={movie.title}
          className="w-full h-full rounded-xl"
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-gray-300 text-base md:text-lg mt-6 max-w-3xl text-center">
        {movie.description}
      </p>

      <Link
        to="/"
        className="mt-8 text-green-400 hover:text-green-300 font-semibold transition-colors text-lg"
      >
        ← Back to Movies
      </Link>
    </div>
  );
}