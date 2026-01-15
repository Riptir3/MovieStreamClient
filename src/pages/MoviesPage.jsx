import { useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useMovies } from "../hooks/useMovies";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import RequestMovieModal from "../components/RequestMovieModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function MoviesPage() {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const { movies, favorites, loading, error, toggleFavorite, loadData } = useMovies();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const moviesPerPage = 20;
  const categories = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  useEffect(() => {
  setCurrentPage(1);
}, [search, categoryFilter]);

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const matchesSearch = 
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.director?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ? true :
        categoryFilter === "Favorites" ? favorites.includes(m.id) :
        m.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [movies, search, categoryFilter, favorites]);

  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  if (loading) return <LoadingSpinner />;
  if (error !== "") return <ErrorMessage message={error} onRetry={loadData}/>;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar 
        user={user} 
        onLogout={() => { 
          logout(); 
          navigate("/login", { replace: true }); }
        } 
      />

      <FilterBar 
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        onOpenModal={() => setIsRequestModalOpen(true)}
      />

      <div className="p-6 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <AnimatePresence mode="popLayout">
          {currentMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={() => toggleFavorite(movie.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg italic">
          No movies found matching your criteria.
        </p>
      )}

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {isRequestModalOpen && (
        <RequestMovieModal onClose={() => setIsRequestModalOpen(false)} />
      )}
    </div>
  );
}