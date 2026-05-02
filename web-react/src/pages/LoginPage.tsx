import LoginForm from "../components/Auth/LoginForm";
import styles from "../styles/LoginPage.module.css";

export default function LoginPage() {
  return (
    <main className={styles.authPage}>
      <section className={styles.authLayout}>
        <div className={styles.authContent}>
          <p className={styles.eyebrow}>CESI ZEN</p>

          <h1 className={styles.mainTitle}>
            Prenez soin de votre équilibre mental.
          </h1>

          <p className={styles.mainText}>
            Un espace simple et rassurant pour suivre votre bien-être, accéder à
            vos ressources et avancer à votre rythme.
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

        <aside className={styles.authPanel} aria-label="Formulaire de connexion">
          <div className={styles.logoBox}>
            <div className={styles.logoShape}>◇</div>

            <div>
              <p className={styles.logoTitle}>CESI</p>
              <p className={styles.logoSubtitle}>ZEN</p>
            </div>
          </div>

          <LoginForm />
        </aside>
      </section>
    </main>
  );
}