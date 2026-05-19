import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RessourceDetailPage from "./pages/RessourceDetailPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/NavBar/NavBar";


import RequireAdmin from "./components/RequireAdmin";
import AdminRessourcesPage from "./pages/admin/Ressources/AdminRessourcesPage";
import CreateRessourcePage from "./pages/admin/Ressources/CreateRessourcePage";
import RessourcesPage from "./pages/RessourcePage";
import AdminRessourceUpdatePage from "./pages/admin/Ressources/AdminRessourcesUpdatePage";
import UsersPage from "./pages/admin/Users/UsersPage";
import EmotionListPage from "./pages/admin/Emotions/EmotionListPage";
import CreateTypeEmotionPage from "./pages/admin/Emotions/CreateTypeEmotionPage";


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


     <Route path="admin/ressources/create" element={ 
       <RequireAdmin>
      <CreateRessourcePage />
      </RequireAdmin>
      }
      />
      <Route path="admin/ressources" element={ 
       <RequireAdmin>
      <AdminRessourcesPage />
      </RequireAdmin>
      }
      />

      <Route path="admin/ressource/update/:id" element={ 
       <RequireAdmin>
      <AdminRessourceUpdatePage />
      </RequireAdmin>
      }
      />

      <Route path="admin/users" element={ 
       <RequireAdmin>
      <UsersPage />
      </RequireAdmin>
      }
      />

       <Route path="admin/emotions" element={ 
       <RequireAdmin>
      <EmotionListPage />
      </RequireAdmin>
      }
      />
       <Route path="/admin/emotions/types/create" element={ 
       <RequireAdmin>
      <CreateTypeEmotionPage />
      </RequireAdmin>
      }
      />



    </Routes>
    </>
  );
}