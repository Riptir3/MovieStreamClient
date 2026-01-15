import { useState } from "react";
import { FiPlus, FiSearch, FiFilm, FiInbox, FiAlertCircle } from "react-icons/fi";
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
    const [modalConfig, setModalConfig] = useState({ isOpen: false, initialData: null });
    const [selectedRequest, setSelectedRequest] = useState(null);

    const filteredMovies = movies.filter(m => 
        m.title.toLowerCase().includes(search.toLowerCase()) || m.id.toString().includes(search)
    );

    const handleSaveMovie = async (movieData) => {
        try {
            if (movieData.id) {
                await updateMovie(movieData.id, movieData);
                updateMovieList(movieData);
            } else {
                const created = await createMovie(movieData);
                addMovieToList(created);
                if (selectedRequest) {
                    await updateMovieRequest(selectedRequest.id, "Approved");
                    removeRequest(selectedRequest.id);
                    setSelectedRequest(null);
                }
            }
            setModalConfig({ isOpen: false, initialData: null });
        } catch (err) { console.error("Save error:", err); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Really want to delete?")) {
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
                description: "", category: "Action", posterUrl: "", videoUrl: ""
            }
        });
    };

    const handleRejectRequest = async (selectedRequest) => {
        try {
            await updateMovieRequest(selectedRequest.id, "Rejected");
            removeRequest(selectedRequest.id)
            setSelectedRequest(null);
        } catch (error) {
            console.error(error)
        }
    };

    const handleRejectReport = async (id) => {
        try {
            await updateMovieReport(id,"Rejected");
            removeReport(id);
        } catch (err) { console.error("Delete error:", err); }
    };

    const handleApproveReport = async (id) => {
        try {
            await updateMovieReport(id,"Approved");
            removeReport(id);
        } catch (err) { console.error("Delete error:", err); }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-[#0a0a0b] p-6 text-gray-100">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tight">
                            Admin <span className="text-green-500">Panel</span>
                        </h2>
                        <p className="text-gray-500 mt-1">Manage your movie database and user requests.</p>
                    </div>

                    <div className="flex bg-gray-900/50 p-1 rounded-xl border border-gray-800 backdrop-blur-md">
                        <TabBtn 
                            icon={<FiFilm />} 
                            label="Movies" 
                            count={movies.length}
                            active={activeTab === "movies"} 
                            onClick={() => setActiveTab("movies")} 
                        />
                        <TabBtn 
                            icon={<FiInbox />} 
                            label="Requests" 
                            count={requests.length}
                            active={activeTab === "requests"} 
                            onClick={() => setActiveTab("requests")} 
                        />
                        <TabBtn 
                            icon={<FiAlertCircle />} 
                            label="Reports" 
                            count={reports.length}
                            active={activeTab === "reports"} 
                            onClick={() => setActiveTab("reports")} 
                        />
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1 group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors" />
                        <input 
                            className="w-full pl-12 pr-4 py-3 bg-gray-900/40 border border-gray-800 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all text-white placeholder:text-gray-600"
                            placeholder="Search by title, director or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {activeTab === "movies" && (
                        <button 
                            onClick={() => setModalConfig({ isOpen: true, initialData: null })}
                            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-95"
                        >
                            <FiPlus size={20} /> Add Movie
                        </button>
                    )}
                </div>

                <main className="bg-[#111113] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
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
                                onApprove={handleApproveReport}
                                onReject={handleRejectReport}
                            />
                        )}
                    </div>
                </main>
            </div>

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

function TabBtn({ label, active, onClick, icon, count }) {
    return (
        <button 
            onClick={onClick}
            className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                ${active 
                    ? 'bg-gray-800 text-green-400 shadow-inner shadow-white/5' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'}
            `}
        >
            <span className={active ? "text-green-500" : "text-gray-600"}>{icon}</span>
            <span>{label}</span>
            <span className={`
                ml-1 text-[10px] px-1.5 py-0.5 rounded-full 
                ${active ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-600'}
            `}>
                {count}
            </span>
        </button>
    );
}