import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RessourcesPage from "./pages/RessourcePage";
import RessourceDetailPage from "./pages/RessourceDetailPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/ressources" element={<RessourcesPage />} />
      <Route path="/ressources/:slug" element={<RessourceDetailPage/>} />

    </Routes>
  );
}