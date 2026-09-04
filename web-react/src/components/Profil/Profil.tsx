import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./module.Profil.module.css";

import { User } from "../../types/users";
import { Message } from "../../types/message";

import { apiGetProfile } from "../../services/profilApi";
import { apiLogOut } from "../../services/authApi";

import ProfileHeader from "./ProfilHeader";
import ProfilMessage from "./ProfilMessage";
import ProfilLoading from "./ProfilLoading";
import ProfileInfoForm from "./ProfilInfo/ProfilInfoForm";
import ProfilPasswordForm from "./ProfilPasswordForm/ProfilPasswordForm";
import ProfilLogoutButton from "./ProfilLogoutButton";
import ProfilDataExport from "./ProfilDataExport";
import ProfilAccountDeletion from "./ProfilAccountDeletion";

export default function Profil() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      setMessage(null);

      try {
        const response = await apiGetProfile();

        if (!response.data) {
          navigate("/login", { replace: true });
          return;
        }

        setUser(response.data);
      } catch {
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  async function handleLogout() {
    try {
      setIsLoading(true);

      await apiLogOut();

      navigate("/login", {
        replace: true,
      });
    } catch {
      navigate("/login", {
        replace: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleAccountDeleted() {
  setUser(null);

  navigate("/login", {
    replace: true,
  });
}

  return (
    <main className={styles.profilePage}>
      <ProfileHeader />

      <ProfilLogoutButton
        handleLogout={handleLogout}
        isLoading={isLoading}
      />

      <ProfilMessage
        message={message}
      />

      <ProfilLoading
        isLoading={isLoading}
      />

      {!isLoading && user && (
        <section className={styles.profileGrid}>
          <ProfileInfoForm
            user={user}
            onProfileUpdated={setUser}
          />

          <ProfilPasswordForm />
           <ProfilDataExport />
           <ProfilAccountDeletion onAccountDeleted={handleAccountDeleted} />
        </section>
      )}
    </main>
  );
}