import { useState, useContext } from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/AuthService";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../api/axios";

export default function LoginPage() {
  const [message, setMessage] = useState(""); 
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const axios = useAxios();

  const handleLogin = async (data) => {
    setMessage("");
    try {
      const response = await loginUser(axios,data.email, data.password);
      login(response.token, response.username)
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
