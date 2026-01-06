export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-400/20 border-t-green-400 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-indigo-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
      </div>
      <p className="mt-4 text-green-400 font-medium animate-pulse tracking-widest uppercase text-xs">
        Loading movies
      </p>
    </div>
  );
}