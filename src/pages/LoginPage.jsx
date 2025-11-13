import { useState, useContext } from "react";
import AuthForm from "../components/AuthForm";
import { login } from "../services/AuthService";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [message, setMessage] = useState(""); 
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setMessage("");
    try {
      const response = await login(data.email, data.password);
      setToken(response.token);
      setMessage("Login successful ✅");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      message={message}
      clearMessage={() => setMessage("")}
    />
  );
}
