import { FiCheck, FiX } from "react-icons/fi";

export default function RequestTable({ requests, onAccept, onReject }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800/50 text-gray-400 uppercase text-xs">
            <th className="p-4">Title</th>
            <th className="p-4">Director</th>
            <th className="p-4">Year</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-700/30 transition-colors">
              <td className="p-4 font-medium">{req.title}</td>
              <td className="p-4 text-gray-400">{req.director}</td>
              <td className="p-4 text-gray-400">{req.releaseYear}</td>
              <td className="p-4 flex justify-center gap-3">
                <button onClick={() => onAccept(req)} className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors">
                  <FiCheck size={20} />
                </button>
                <button onClick={() => onReject(req)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                  <FiX size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}