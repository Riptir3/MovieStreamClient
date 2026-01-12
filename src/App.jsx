import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviesPage from "./pages/MoviesPage";
import MoviePlayerPage from "./pages/MoviePlayerPage";
import AdminMoviesPage from "./pages/AdminMoviePage"

import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoutes"
import AdminRoute from "./components/AdminRoute"
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route element={<AdminRoute/>}>
          <Route path="/admin" element={<AdminMoviesPage />}/>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MoviesPage />}/>
          <Route path="/movies/:id" element={<MoviePlayerPage />}/>
        </Route>

        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;