import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, createMovieReport } from "../services/MovieService";
import LoadingSpinner from "../components/LoadingSpinner"; 
import ErrorMessage from "../components/ErrorMessage";   

export default function MoviePlayerPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportComment, setReportComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sentMessage, setSentMessage] = useState("");

  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await getMovie(id);
      setMovie(response);
    } catch (err) {
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const categoryColors = {
    Action: "bg-red-700 text-red-100",
    Comedy: "bg-yellow-600 text-yellow-900",
    Drama: "bg-blue-700 text-blue-100",
    Horror: "bg-gray-800 text-gray-200",
    "Sci-Fi": "bg-purple-700 text-purple-100",
    Default: "bg-green-700 text-green-100",
  };

  const handleSendReport = async () => {
    if (!reportComment.trim()) return;
    try {
      setSending(true);
      await createMovieReport(id, reportComment);
      setSentMessage("Report sent successfully!");
      setReportComment("");
      setTimeout(() => {
        setShowReportModal(false);
        setSentMessage("");
      }, 1500);
    } catch (err) {
      setSentMessage(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} onRetry={fetchMovie} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 text-center mb-2 drop-shadow-lg">
        {movie.title}
      </h1>

      <span className={`px-4 py-1 rounded-full text-sm font-bold mb-6 shadow-md ${categoryColors[movie.category] || categoryColors.Default}`}>
        {movie.category}
      </span>

      <div className="relative w-full max-w-5xl aspect-video rounded-xl shadow-2xl border-4 border-green-600/50 overflow-hidden transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
        <iframe
          src={movie.videoUrl}
          title={movie.title}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>

      <div className="w-full max-w-5xl bg-gray-800 bg-opacity-40 border border-green-700 rounded-xl mt-8 p-6 shadow-xl backdrop-blur">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-48 h-72 object-cover rounded-lg shadow-lg border border-green-700"
          />

          <div className="flex-1 text-gray-200">
            <h2 className="text-2xl font-bold text-green-400 mb-3">
              Movie Information
            </h2>
            <p className="text-lg"><span className="font-semibold text-green-300">Director:</span> {movie.director || "Unknown"}</p>
            <p className="text-lg mt-1"><span className="font-semibold text-green-300">Year:</span> {movie.releaseYear || "Unknown"}</p>
            <h3 className="text-xl font-semibold text-green-400 mt-4 mb-2">Description</h3>
            <div className="text-gray-300 text-base md:text-lg leading-relaxed break-all italic">
              {movie.description}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pb-12">
        <Link
          to="/"
          className="group text-gray-400 hover:text-green-400 transition-all flex items-center gap-2 text-lg"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Movies
        </Link>

        <button
          onClick={() => setShowReportModal(true)}
          className="bg-red-600/80 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all active:scale-95"
        >
          Report Movie Issue
        </button>
      </div>

      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-[0_0_30px_rgba(220,38,38,0.2)] border border-red-900/50">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Report an Issue</h2>
            <p className="text-gray-400 mb-4 text-sm">Please briefly describe the problem (e.g., video not starting, no sound).</p>

            <textarea
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
              className="w-full p-4 h-32 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all resize-none"
              placeholder="What's the problem?"
            ></textarea>

            {sentMessage && (
              <p className={`mt-3 text-sm font-medium ${sentMessage.toLowerCase().includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                {sentMessage}
              </p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={sending}
              >
                Cancel
              </button>

              <button
                onClick={handleSendReport}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold disabled:opacity-50 transition-all"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}