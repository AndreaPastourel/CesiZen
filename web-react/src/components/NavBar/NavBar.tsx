import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { apiGetProfile } from "../../services/profilApi";
import styles from "./module.NavBar.module.css";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    checkAuthentication();
  }, [location.pathname]);

  async function checkAuthentication() {
    try {
      const response = await apiGetProfile();

      const user = response.data ?? response.data;

      setIsAuthenticated(true);

      const roleCode = user.role?.code;

      const userIsAdmin =
        roleCode === "ROLE_ADMIN";

      setIsAdmin(userIsAdmin);
    } catch {
      setIsAuthenticated(false);

      setIsAdmin(false);
    }
  }

  return (
    <header className={styles.navbar}>
      <NavLink to="/ressources" className={styles.logo}>
        CESI ZEN
      </NavLink>

      <nav className={styles.navLinks} aria-label="Navigation principale">
        <NavLink
          to="/ressources"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Ressources
        </NavLink>

        {isAdmin && (
          <>
          <NavLink
            to="/admin/ressources"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            CRUD Ressources
          </NavLink>

           <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            CRUD Utilisateur
          </NavLink>

          
           <NavLink
            to="/admin/emotions"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            CRUD Emotions
          </NavLink>
          </>
          
        )}
      {isAuthenticated ? (
        <>
          <NavLink
            to="/journal"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Journal
          </NavLink>

          <NavLink
            to="/profil"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Mon profil
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Connexion
        </NavLink>
)}
      </nav>
    </header>
  );
}