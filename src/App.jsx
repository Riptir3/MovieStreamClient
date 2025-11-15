import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviesPage from "./pages/MoviesPage";
import MoviePlayerPage from "./pages/MoviePlayerPage";

import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoutes"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MoviesPage />}/>
          <Route path="/movies/:id" element={<MoviePlayerPage />}/>
        </Route>

        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      </Routes>
    </Router>
  );
}

export default App;