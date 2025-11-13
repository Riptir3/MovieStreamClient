import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthForm({ type, onSubmit, message, clearMessage }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 via-lime-500 to-emerald-400 px-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700 rounded-3xl shadow-xl w-full max-w-md p-10"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {isRegister ? "Create an Account" : "Login"}
        </h2>

        <div className="mb-6">
          <label className="block text-white mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full px-3 py-2 rounded-lg bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
/>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
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
      </form>
    </div>
  );
}