import RegisterForm from "../components/Auth/Register/RegisterForm";
import styles from "../styles/LoginPage.module.css";

export default function RegisterPage(){
    return (
        <main className={styles.authPage}>
      <section className={styles.authLayout}>
        <div className={styles.authContent}>
          <p className={styles.eyebrow}>CESI ZEN</p>

          <h1 className={styles.mainTitle}>Créez votre espace bien-être.</h1>

          <p className={styles.mainText}>
            Rejoignez CESI Zen pour accéder à vos ressources, suivre votre
            équilibre mental et avancer dans un environnement sécurisé.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>✦</span>
              <p>Suivi personnel</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>☘</span>
              <p>Ressources bien-être</p>
            </div>

            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>○</span>
              <p>Espace sécurisé</p>
            </div>
          </div>
        </div>

        <aside
          className={styles.authPanel}
          aria-label="Formulaire d'inscription"
        >
          <div className={styles.logoBox}>
            <div className={styles.logoShape}>◇</div>

            <div>
              <p className={styles.logoTitle}>CESI</p>
              <p className={styles.logoSubtitle}>ZEN</p>
            </div>
          </div>

          <RegisterForm />
        </aside>
      </section>
    </main>
    )
}