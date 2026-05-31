
import { useEffect, useState } from "react";
import styles from "./module.Profil.module.css";
import { User } from "../../types/users";
import { Message } from "../../types/message";
import { apiGetProfile } from "../../services/profilApi";
import ProfileHeader from "./ProfilHeader";
import ProfilMessage from "./ProfilMessage";
import ProfilLoading from "./ProfilLoading";
import ProfileInfoForm from "./ProfilInfo/ProfilInfoForm";
import ProfilPasswordForm from "./ProfilPasswordForm/ProfilPasswordForm";
import { useNavigate } from "react-router-dom";
import { apiLogOut } from "../../services/authApi";
import ProfilLogoutButton from "./ProfilLogoutButton";


export default function Profil() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [message, setMessage] = useState<Message>(null);


  useEffect(() => {
   
    loadProfile();
  }, []);


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
  } catch (error) {
    navigate("/login", { replace: true });
  } finally {
    setIsLoading(false);
  }
}



  async function handleLogout() {
    try {
      setIsLoading(true);

      await apiLogOut();

      navigate("/login", { replace: true });
    } catch {
      navigate("/login", { replace: true });
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <main className={styles.profilePage}>
    
    <ProfileHeader/>
    <ProfilLogoutButton
    handleLogout={handleLogout}
    isLoading={isLoading}
     />
    <ProfilMessage
    message={message}
    />

      <ProfilLoading
      isLoading = {isLoading}/>

      {!isLoading && user && (
        <section className={styles.profileGrid}>
          <ProfileInfoForm user={user} onProfileUpdated={setUser} />

          <ProfilPasswordForm />
        </section>
      )}
    </main>
  );
}