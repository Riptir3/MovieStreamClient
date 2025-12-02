import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiCheck, FiX } from "react-icons/fi";
import { useAxios } from "../api/axios";
import {
  getAllMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getActiveMovieRequest,
  updateMovieRequest,
  getActiveMovieReport,
  updateMovieReport,
} from "../services/MovieService";

export default function AdminMoviesPage() {
  const [activeTab, setActiveTab] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    category: "",
    posterUrl: "",
    videoUrl: "",
    director: "",
    releaseYear: 0,
  });

  const [editMovie, setEditMovie] = useState({
    title: "",
    description: "",
    category: "",
    posterUrl: "",
    videoUrl: "",
    director: "",
    releaseYear: 0,
  });

  const axios = useAxios();

  useEffect(() => {
    fetchMovies();
    fetchRequests();
    fetchReports();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getAllMovie(axios);
      setMovies(response);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await getActiveMovieRequest(axios);
      setRequests(response);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await getActiveMovieReport(axios);
      setReports(response);
    } catch (err) {
      console.log(err);
    }
  };

  const openEditModal = (movie) => {
    setSelectedMovie(movie);
    setEditMovie(movie);
    setShowEditModal(true);
  };

  const openDeleteModal = (movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const handleAddMovie = async () => {
    try {
      const response = await createMovie(axios, newMovie);
      setMovies([...movies, response]);

      if (selectedRequest) {
        await updateMovieRequest(axios, selectedRequest.id, "Accepted");
        setRequests(requests.filter((r) => r.id !== selectedRequest.id));
        setSelectedRequest(null);
      }

      setShowAddModal(false);
      setNewMovie({
        title: "",
        description: "",
        category: "",
        posterUrl: "",
        videoUrl: "",
        director: "",
        releaseYear: 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateMovie = async () => {
    try {
      await updateMovie(axios, editMovie);
      setMovies((prev) =>
        prev.map((m) => (m.id === editMovie.id ? editMovie : m))
      );
      setShowEditModal(false);
      setEditMovie({
        title: "",
        description: "",
        category: "",
        posterUrl: "",
        videoUrl: "",
        director: "",
        releaseYear: 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(axios, selectedMovie.id);
      setMovies((prev) => prev.filter((m) => m.id !== selectedMovie.id));
      setSelectedMovie(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptRequest = (request) => {
    setSelectedRequest(request);
    setNewMovie({
      title: request.title,
      description: "",
      category: "",
      posterUrl: "",
      videoUrl: "",
      director: request.director,
      releaseYear: request.releaseYear,
    });
    setShowAddModal(true);
  };

  const handleRejectRequest = async (request) => {
    try {
      await updateMovieRequest(axios, request.id, "Rejected");
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptReport = async (report) => {
    try {
      await updateMovieReport(axios, report.id, "Approved");
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectReport = async (report) => {
    try {
      await updateMovieReport(axios, report.id, "Rejected");
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } catch (err) {
      console.log(err);
    }
  };

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRequests = requests.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredReports = reports; 

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-300 mb-6">Admin Panel</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "movies"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setActiveTab("movies")}
        >
          Movies
        </button>

        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "requests"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests ({requests.length})
        </button>

        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "reports"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setActiveTab("reports")}
        >
          Reports ({reports.length})
        </button>
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {activeTab === "movies" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <FiPlus size={18} /> Add Movie
          </button>
        )}
      </div>

      {/* Movies Tab */}
      {activeTab === "movies" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-3">Title</th>
                <th className="p-3">Year</th>
                <th className="p-3">Director</th>
                <th className="p-3 w-1/2">Description</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors text-black hover:text-white"
                >
                  <td className="py-3">{movie.title}</td>
                  <td className="py-3">{movie.releaseYear}</td>
                  <td className="py-3">{movie.director}</td>
                  <td className="py-3 max-w-lg truncate">
                    {movie.description}
                  </td>
                  <td className="p-3 flex justify-center gap-4">
                    <FiEdit
                      onClick={() => openEditModal(movie)}
                      className="text-blue-400 hover:text-blue-300 cursor-pointer"
                      size={22}
                    />
                    <FiTrash2
                      onClick={() => openDeleteModal(movie)}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                      size={22}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-3">Title</th>
                <th className="p-3">Year</th>
                <th className="p-3">Director</th>
                <th className="p-3 w-1/2">Comment</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors text-black hover:text-white"
                >
                  <td className="py-3">{req.title}</td>
                  <td className="py-3">{req.releaseYear}</td>
                  <td className="py-3">{req.director}</td>
                  <td className="py-3 max-w-lg truncate">{req.comment}</td>
                  <td className="p-3 flex justify-center gap-4">
                    <FiCheck
                      onClick={() => handleAcceptRequest(req)}
                      className="text-green-400 hover:text-green-300 cursor-pointer"
                      size={22}
                    />
                    <FiX
                      onClick={() => handleRejectRequest(req)}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                      size={22}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-3">Movie Id</th>
                <th className="p-3 w-1/2">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((rep) => (
                <tr
                  key={rep.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors text-black hover:text-white"
                >
                  <td className="py-3">{rep.movieId}</td>
                  <td className="py-3 max-w-lg truncate">{rep.comment}</td>
                  <td className="py-3">{rep.status}</td>
                  <td className="p-3 flex justify-center gap-4">
                    <FiCheck
                      onClick={() => handleAcceptReport(rep)}
                      className="text-green-400 hover:text-green-300 cursor-pointer"
                      size={22}
                    />
                    <FiX
                      onClick={() => handleRejectReport(rep)}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                      size={22}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODALS */}
      {showAddModal && (
        <Modal title="Add New Movie" onClose={() => setShowAddModal(false)}>
          <MovieForm
            movie={newMovie}
            setMovie={setNewMovie}
            submitText="Create"
            onSubmit={handleAddMovie}
          />
        </Modal>
      )}

      {showEditModal && (
        <Modal title="Edit Movie" onClose={() => setShowEditModal(false)}>
          <MovieForm
            movie={editMovie}
            setMovie={setEditMovie}
            submitText="Save Changes"
            onSubmit={handleUpdateMovie}
          />
        </Modal>
      )}

      {showDeleteModal && (
        <Modal title="Delete Movie" onClose={() => setShowDeleteModal(false)}>
          <p className="text-lg">
            Are you sure you want to delete{" "}
            <span className="font-bold text-red-400">
              {selectedMovie?.title}
            </span>
            ?
          </p>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteMovie}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✖
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------------- MOVIE FORM ---------------- */

function MovieForm({ movie, setMovie, submitText, onSubmit }) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <input
          className="p-2 bg-gray-800 rounded"
          placeholder="Title"
          value={movie.title}
          required
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        />

        <input
          className="p-2 bg-gray-800 rounded"
          placeholder="Release Year"
          value={movie.releaseYear}
          required
          onChange={(e) =>
            setMovie({ ...movie, releaseYear: e.target.value })
          }
        />

        <input
          className="p-2 bg-gray-800 rounded"
          placeholder="Director"
          value={movie.director}
          required
          onChange={(e) => setMovie({ ...movie, director: e.target.value })}
        />

        <input
          className="p-2 bg-gray-800 rounded"
          placeholder="Category"
          value={movie.category}
          required
          onChange={(e) => setMovie({ ...movie, category: e.target.value })}
        />

        <textarea
          className="p-2 bg-gray-800 rounded h-28"
          placeholder="Description"
          value={movie.description}
          required
          onChange={(e) =>
            setMovie({ ...movie, description: e.target.value })
          }
        />

        <input
          className="p-2 bg-gray-800 rounded"
          placeholder="Poster URL"
          value={movie.posterUrl}
          required
          onChange={(e) => setMovie({ ...movie, posterUrl: e.target.value })}
        />

        <input
          className="p-2 bg-gray-800 rounded"
          placeholder="Video URL"
          value={movie.videoUrl}
          required
          onChange={(e) => setMovie({ ...movie, videoUrl: e.target.value })}
        />
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white"
        >
          {submitText}
        </button>
      </div>
    </div>
  );
}
