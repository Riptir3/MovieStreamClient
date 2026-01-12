import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/AuthService";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [isWarning, setIsWarning] = useState(false);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const expiredFromState = location.state?.expired;
  const expiredFromUrl = params.get("expired") === "true";

  if (expiredFromState || expiredFromUrl) {
    setIsWarning(true);
    setMessage("Log in to continue.");
  }
}, [location]);

  const handleLogin = async (data) => {
    setMessage("");
    setIsWarning(false);
    
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
        isWarning={isWarning} 
        clearMessage={() => {
          setMessage("");
          setIsWarning(false);
        }}
      />
  );
}