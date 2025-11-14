import { useState } from "react";
import AuthForm from "../components/AuthForm";
import {  registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../api/axios";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();
  const handleRegister = async (data) => {
    try {
      await registerUser(axios,data.username, data.email,data.password);
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
