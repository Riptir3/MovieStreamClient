import { FiCheck, FiX } from "react-icons/fi";

export default function ReportTable({ reports, onApprove, onReject }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800/50 text-gray-400 uppercase text-xs">
            <th className="p-4">Movie ID</th>
            <th className="p-4">Issue description</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {reports.map((rep) => (
            <tr key={rep.id} className="hover:bg-gray-700/30 transition-colors">
              <td className="p-4 text-sm text-gray-500">#{rep.movieId}</td>
              <td className="p-4 text-gray-300 italic">"{rep.comment}"</td>
              <td className="p-4">
                <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs">
                  {rep.status}
                </span>
              </td>
              <td className="p-4 flex justify-center gap-3">
                <button onClick={() => onApprove(rep.id)} className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg">
                  <FiCheck size={20} />
                </button>
                <button onClick={() => onReject(rep.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg">
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