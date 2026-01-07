import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/AuthService";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const [message, setMessage] = useState(""); 
  const { login } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data) => {
    setMessage("");
    try {
      const response = await loginUser(data.email, data.password);
      setMessage("Login successful ✅");
      
      setTimeout(() => {
      login(response.token);
      
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    }, 1000);

    } catch (err) {
      setMessage(err);
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
