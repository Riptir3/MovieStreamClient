import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/AuthService";
import { UserContext } from "../contexts/UserContext";
import { useAxios } from "../api/axios";

export default function LoginPage() {
  const [message, setMessage] = useState(""); 
  const { login } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const axios = useAxios();

  const handleLogin = async (data) => {
    setMessage("");
    try {
      const response = await loginUser(axios,data.email, data.password);
      login(response.token, response.username)

      const redirectTo = location.state?.from?.pathname || "/";

      setMessage("Login successful ✅");
      setTimeout(() => {
        navigate(redirectTo, { replace: true });;
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
