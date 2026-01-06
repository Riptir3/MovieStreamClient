import { useState, useEffect } from "react";
import { getAllMovie } from "../services/MovieService";
import { getFavorites, addFavorite, removeFavorite } from "../services/FavoriteService";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [movieRes, favRes] = await Promise.all([getAllMovie(), getFavorites()]);
      setMovies(movieRes);
      setFavorites(favRes);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const toggleFavorite = async (movieId) => {
    const isFav = favorites.includes(movieId);
    try {
      if (isFav) {
        await removeFavorite(movieId);
        setFavorites(prev => prev.filter(id => id !== movieId));
      } else {
        await addFavorite(movieId);
        setFavorites(prev => [...prev, movieId]);
      }
    } catch (err) { console.error(err); }
  };

  return { movies, favorites, loading, error, toggleFavorite };
}