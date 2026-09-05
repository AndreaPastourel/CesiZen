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
import CreateEmotionPage from "./pages/admin/Emotions/CreateEmotionPage";
import EditTypeEmotionPage from "./pages/admin/Emotions/EditTypeEmotionPage";
import UpdateEmotionPage from "./pages/admin/Emotions/UpdateEmotionPage";
import JournalStatsPage from "./pages/JournalStats";
import UpdateTypesRessourcesPage from './pages/admin/Ressources/TypesRessources/UpdateTypesRessourcesPage';
import AdminTypesRessourcesPage from "./pages/admin/Ressources/TypesRessources/AdminTypesRessourcesPage";
import CreateTypesRessourcesPage from './pages/admin/Ressources/TypesRessources/CreateTypesRessourcesPage';
import CookieConsentPopup from "./components/Cookies/CookieConsentPopup";
import MentionLegalPage from "./pages/mentionLegalPage";
import ParametresPage from "./pages/ParametresPages";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";


export default function App() {
  return (
     <>
     <Navbar />

    <Routes>
      <Route path="/" element={<Navigate to="/ressources" replace />} />


      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
       <Route path="/profil" element={<ProfilePage/>} />

      <Route path="/ressources" element={<RessourcesPage />} />
      <Route path="/ressources/:slug" element={<RessourceDetailPage/>} />

       <Route path="/journal" element={<JournalStatsPage />} />
       <Route path="/mentionLegal" element={<MentionLegalPage />} />


       <Route path="/parametres" element={<ParametresPage/>}/>


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

       <Route path="/admin/emotions/create" element={ 
       <RequireAdmin>
      <CreateEmotionPage />
      </RequireAdmin>
      }
      />

      <Route path="/admin/emotions/create/:id_type" element={ 
       <RequireAdmin>
      <CreateEmotionPage />
      </RequireAdmin>
      }
      />

      <Route
    path="/admin/emotions/types/update/:id"element={
    <RequireAdmin>
      <EditTypeEmotionPage />
    </RequireAdmin>
  }
  />

  <Route
  path="/admin/emotions/update/:id"
  element={
    <RequireAdmin>
      <UpdateEmotionPage />
    </RequireAdmin>
  }
/>
      <Route
  path="/admin/ressources/types/update/:id"
  element={
    <RequireAdmin>
      <UpdateTypesRessourcesPage />
    </RequireAdmin>
  }
/>
  <Route
  path="/admin/ressources/types"
  element={
    <RequireAdmin>
      <AdminTypesRessourcesPage />
    </RequireAdmin>
  }
/>
  <Route
  path="/admin/ressources/types/create"
  element={
    <RequireAdmin>
      <CreateTypesRessourcesPage />
    </RequireAdmin>
  }

/>
    </Routes>

    <CookieConsentPopup />

    <Route
  path="/politique-confidentialite"
  element={<PrivacyPolicyPage />}
/>
    </>


    
  );
}