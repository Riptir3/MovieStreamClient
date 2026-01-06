import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-800 shadow-md border-b border-gray-700">
      <Link to="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
        Movies
      </Link>
      
      <div className="flex items-center space-x-4">
        {user && (
          <span className="hidden sm:inline-block bg-green-600/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full font-semibold text-sm shadow-sm">
            Welcome, {user}!
          </span>
        )}
        
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg active:scale-95"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}