import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { register } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await register(data.username, data.email,data.password);
        setMessage("Rigistration successful ✅");
        setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
      <AuthForm type="register" onSubmit={handleRegister} message={message} clearMessage={() => setMessage("")}/>
  );
}
