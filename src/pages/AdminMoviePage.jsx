import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useAdminData } from "../hooks/useAdminData";
import { createMovie, updateMovie, deleteMovie, updateMovieRequest, updateMovieReport } from "../services/MovieService";

import MovieFormModal from "../components/MovieFormModal";
import MovieTable from "../components/MovieTable";
import RequestTable from "../components/RequestTable";
import ReportTable from "../components/ReportTable";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AdminMoviesPage() {
    const { 
        movies, requests, reports, loading, 
        addMovieToList, updateMovieList, removeMovie, removeRequest, removeReport 
    } = useAdminData();

    const [activeTab, setActiveTab] = useState("movies");
    const [search, setSearch] = useState("");
    
    // Modal állapotok
    const [modalConfig, setModalConfig] = useState({ isOpen: false, initialData: null });
    const [selectedRequest, setSelectedRequest] = useState(null);

    // --- KERESÉS LOGIKA ---
    const filteredMovies = movies.filter(m => 
        m.title.toLowerCase().includes(search.toLowerCase()) || m.id.toString().includes(search)
    );

    // --- HANDLEREK (A LOGIKA) ---
    const handleSaveMovie = async (movieData) => {
        try {
            if (movieData.id) {
                await updateMovie(movieData);
                updateMovieList(movieData);
            } else {
                const created = await createMovie(movieData);
                addMovieToList(created);
                
                // Ha egy kérésből hoztuk létre, zárjuk le a kérést is
                if (selectedRequest) {
                    await updateMovieRequest(selectedRequest.id, "Accepted");
                    removeRequest(selectedRequest.id);
                    setSelectedRequest(null);
                }
            }
            setModalConfig({ isOpen: false, initialData: null });
        } catch (err) { console.error("Save error:", err); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni akarod?")) {
            try {
                await deleteMovie(id);
                removeMovie(id);
            } catch (err) { console.error("Delete error:", err); }
        }
    };

    const handleAcceptRequest = (request) => {
        setSelectedRequest(request);
        setModalConfig({
            isOpen: true,
            initialData: {
                title: request.title,
                director: request.director,
                releaseYear: request.releaseYear,
                description: "",
                category: "",
                posterUrl: "",
                videoUrl: ""
            }
        });
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 w-full max-w-7xl mx-auto text-white">
            <header className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-yellow-400">Admin Dashboard</h2>
                <div className="flex gap-2">
                    <TabBtn label={`Movies (${movies.length})`} active={activeTab === "movies"} onClick={() => setActiveTab("movies")} />
                    <TabBtn label={`Requests (${requests.length})`} active={activeTab === "requests"} onClick={() => setActiveTab("requests")} />
                    <TabBtn label={`Reports (${reports.length})`} active={activeTab === "reports"} onClick={() => setActiveTab("reports")} />
                </div>
            </header>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="Search by title or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {activeTab === "movies" && (
                    <button 
                        onClick={() => setModalConfig({ isOpen: true, initialData: null })}
                        className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                    >
                        <FiPlus /> Add Movie
                    </button>
                )}
            </div>

            <main className="bg-gray-800/40 rounded-2xl border border-gray-700 overflow-hidden">
                {activeTab === "movies" && (
                    <MovieTable 
                        movies={filteredMovies} 
                        onEdit={(m) => setModalConfig({ isOpen: true, initialData: m })} 
                        onDelete={handleDelete} 
                    />
                )}
                
                {activeTab === "requests" && (
                    <RequestTable 
                        requests={requests} 
                        onAccept={handleAcceptRequest} 
                        onReject={handleRejectRequest} 
                    />
                )}

                {activeTab === "reports" && (
                    <ReportTable 
                        reports={reports} 
                        onApprove={handleAcceptReport} 
                        onReject={handleRejectReport} 
                    />
                )}
            </main>

            <MovieFormModal 
                isOpen={modalConfig.isOpen}
                initialData={modalConfig.initialData}
                onClose={() => {
                    setModalConfig({ isOpen: false, initialData: null });
                    setSelectedRequest(null);
                }}
                onSubmit={handleSaveMovie}
            />
        </div>
    );
}

function TabBtn({ label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`px-4 py-2 rounded-lg transition-all ${active ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
        >
            {label}
        </button>
    );
}