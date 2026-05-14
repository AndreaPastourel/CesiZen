import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RessourcesPage from "./pages/RessourcePage";
import RessourceDetailPage from "./pages/RessourceDetailPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/NavBar/NavBar";
import CreateRessourcePage from "./pages/CreateRessourcePage";


export default function App() {
  return (
     <>
     <Navbar />

    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
       <Route path="/profil" element={<ProfilePage/>} />

      <Route path="/ressources" element={<RessourcesPage />} />
      <Route path="/ressources/:slug" element={<RessourceDetailPage/>} />
      <Route path="/ressources/create" element={<CreateRessourcePage />} />

    </Routes>
    </>
  );
}