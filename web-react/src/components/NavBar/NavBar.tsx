import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { apiGetProfile } from "../../services/profilApi";
import styles from "./module.NavBar.module.css";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    checkAuthentication();
  }, [location.pathname]);

  async function checkAuthentication() {
    try {
      await apiGetProfile();

      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
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

        {isAuthenticated ? (
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Mon profil
          </NavLink>
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