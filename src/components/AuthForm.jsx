import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function AuthForm({ type, onSubmit, message, clearMessage }) {
  const [formData, setFormData] = useState({
    username : "",
    email: "",
    password: ""
  });

  const isRegister = type === "register";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message && clearMessage) clearMessage();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {isRegister ? "Create an Account" : "Login"}
        </h2>

        {isRegister &&
        <div className="mb-6">
          <label className="block text-white mb-2 font-medium">Username</label>
          <input
            type="text"
            name="username"
            minLength={5}
            onChange={handleChange}
            value={formData.username}
            required
            autoComplete="new-username"
            className="w-full px-3 py-2 rounded-lg bg-green-800 text-white text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"/>
        </div>
        }

        <div className="mb-6">
          <label className="block text-white mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
            autoComplete="new-email"
            className="w-full px-3 py-2 rounded-lg bg-green-800 text-white text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
/>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            minLength={7}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="w-full px-3 py-2 rounded-lg bg-green-800 text-white text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`px-4 py-2 rounded mb-6 text-center text-sm ${
                message.includes("successful")
                  ? "bg-green-50 border border-green-500 text-green-800"
                  : "bg-red-50 border border-red-500 text-red-800"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        {!isRegister ? (
          <p className="text-gray-400 text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              Create one here
            </Link>
          </p>
        ) : (
          <p className="text-gray-400 text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              Login in here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}