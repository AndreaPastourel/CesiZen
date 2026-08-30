
import { useState } from "react";

import {
  acceptAllCookies,
  CookieConsent,
  getCookieConsent,
  refuseOptionalCookies,
  saveCookieConsent,
} from "../../services/cookieConsentService";

import styles from "./module.PopUpCookie.module.css";

export default function CookieConsentPopup() {
  const [initialConsent] = useState(() => getCookieConsent());

  const [isVisible, setIsVisible] = useState<boolean>(
    () => !initialConsent
  );

  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [analytics, setAnalytics] = useState<boolean>(
    () => initialConsent?.analytics ?? false
  );

  const [preferences, setPreferences] = useState<boolean>(
    () => initialConsent?.preferences ?? false
  );

  function handleAcceptAll() {
    acceptAllCookies();

    setAnalytics(true);
    setPreferences(true);
    setIsVisible(false);
  }

  function handleRefuseAll() {
    refuseOptionalCookies();

    setAnalytics(false);
    setPreferences(false);
    setIsVisible(false);
  }

  function handleSaveSettings() {
    const consent: CookieConsent = {
      necessary: true,
      analytics,
      preferences,
    };

    saveCookieConsent(consent);
    setIsVisible(false);
  }
 
  


  if (!isVisible) {
    return null;
  }

  
  return (
   
    <section className={styles.overlay} aria-label="Gestion des cookies">
      <div className={styles.popup}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>CONFIDENTIALITÉ</p>
          <h2>Gestion des cookies</h2>

          <p>
            CESI Zen utilise des cookies nécessaires au fonctionnement du site.
            Vous pouvez aussi accepter ou refuser les cookies optionnels.
          </p>
        </div>

        
        {!showSettings ? (
          <>
           
            <div className={styles.infoBox}>
              <p>
                Les cookies nécessaires sont toujours actifs. Les autres cookies
                servent à améliorer l’expérience utilisateur ou à mesurer
                l’utilisation du site.
              </p>
            </div>

           
            <div className={styles.actions}>
             
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handleRefuseAll}
              >
                Tout refuser
              </button>

             
              <button
                type="button"
                className={styles.settingsButton}
                onClick={() => setShowSettings(true)}
              >
                Personnaliser
              </button>

           
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleAcceptAll}
              >
                Tout accepter
              </button>
            </div>
          </>
        ) : (
         
          <>
            
            <div className={styles.settingsList}>
              <div className={styles.cookieOption}>
                <div>
                  <strong>Cookies nécessaires</strong>

                  <p>
                    Ils permettent le fonctionnement de base du site et ne
                    peuvent pas être désactivés.
                  </p>
                </div>

                <span className={styles.requiredBadge}>Toujours actifs</span>
              </div>

              <label className={styles.cookieOption}>
                <div>
                  <strong>Cookies de mesure d’audience</strong>

                  <p>
                    Ils permettent de comprendre l’utilisation du site afin de
                    l’améliorer.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                />
              </label>

              <label className={styles.cookieOption}>
                <div>
                  <strong>Cookies de préférences</strong>

                  <p>
                    Ils permettent de retenir certains choix d’affichage ou de
                    confort.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={preferences}
                  onChange={(event) => setPreferences(event.target.checked)}
                />
              </label>
            </div>

       
            <div className={styles.actions}>
          
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setShowSettings(false)}
              >
                Retour
              </button>


              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleSaveSettings}
              >
                Enregistrer mes choix
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

