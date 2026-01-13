import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function MovieTable({ movies, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800/50 text-gray-400 uppercase text-xs">
            <th className="p-4">Film címe</th>
            <th className="p-4">Év</th>
            <th className="p-4">Rendező</th>
            <th className="p-4 w-1/3">Leírás</th>
            <th className="p-4 text-center">Műveletek</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {movies.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-700/30 transition-colors">
              <td className="p-4 font-medium">{movie.title}</td>
              <td className="p-4 text-gray-400">{movie.releaseYear}</td>
              <td className="p-4 text-gray-400">{movie.director}</td>
              <td className="p-4"><p className="truncate max-w-xs text-sm text-gray-400">{movie.description}</p></td>
              <td className="p-4 flex justify-center gap-3">
                <button onClick={() => onEdit(movie)} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                  <FiEdit size={20} />
                </button>
                <button onClick={() => onDelete(movie.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}