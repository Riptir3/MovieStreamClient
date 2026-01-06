export default function FilterBar({ 
  search, 
  setSearch, 
  categoryFilter, 
  setCategoryFilter, 
  categories, 
  onOpenModal 
}) {
  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 border border-gray-700"
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400 border border-gray-700 cursor-pointer"
      >
        <option value="All">All Categories</option>
        <option value="Favorites">My Favorites</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        onClick={onOpenModal}
        className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg"
      >
        Request Movie
      </button>
    </div>
  );
}