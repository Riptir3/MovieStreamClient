import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviesPage from "./pages/MoviesPage";
import MoviePlayerPage from "./pages/MoviePlayerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesPage />}/>
        <Route path="/movies/:id" element={<MoviePlayerPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;