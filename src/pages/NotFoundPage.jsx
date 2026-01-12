import ErrorMessage from "../components/ErrorMessage";
import { useEffect } from "react";

export default function NotFoundPage() {

useEffect(()=>{
    window.history.replaceState(null,"","/");
},[])

  return (
      <ErrorMessage 
        message="The page you're looking for is not found." 
      />
  );
}