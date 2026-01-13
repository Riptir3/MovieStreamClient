import { useState, useEffect } from "react";
import { 
  getAllMovie, getActiveMovieRequest, getActiveMovieReport,
  deleteMovie, updateMovieRequest, updateMovieReport 
} from "../services/MovieService";

export const useAdminData = () => {
  const [movies, setMovies] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [movieRes, reqRes, reportRes] = await Promise.all([
        getAllMovie(),
        getActiveMovieRequest(),
        getActiveMovieReport()
      ]);
      setMovies(movieRes);
      setRequests(reqRes);
      setReports(reportRes);
    } catch (err) {
      console.error("Hiba az adatok letöltésekor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeRequest = (id) => setRequests(prev => prev.filter(r => r.id !== id));
  const removeReport = (id) => setReports(prev => prev.filter(r => r.id !== id));
  const removeMovie = (id) => setMovies(prev => prev.filter(m => m.id !== id));
  const updateMovieList = (updated) => setMovies(prev => prev.map(m => m.id === updated.id ? updated : m));
  const addMovieToList = (newMovie) => setMovies(prev => [...prev, newMovie]);

  return { 
    movies, requests, reports, loading, 
    fetchData, removeRequest, removeReport, removeMovie, 
    updateMovieList, addMovieToList 
  };
};