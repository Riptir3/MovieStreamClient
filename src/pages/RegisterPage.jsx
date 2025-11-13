import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { register } from "../services/AuthService";

export default function RegisterPage() {
  const [error, setError] = useState("");

  const handleRegister = async (data) => {
    setError("");
    try {
      await register(data);
      alert("Registration successful ✅");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <AuthForm type="register" onSubmit={handleRegister} error={error} clearError={() => setError("")}/>
  );
}
