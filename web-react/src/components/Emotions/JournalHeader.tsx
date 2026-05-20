
import { Dispatch, SetStateAction } from "react";
import styles from "./module.JournalStats.module.css"

type Period = "week" | "month";

type Props = {
  getPeriodLabel: () => string;
  period: Period;
  setPeriod: Dispatch<SetStateAction<Period>>;
};

export default function JournalHeader({getPeriodLabel,period,setPeriod}:Readonly<Props>){
    return(
        <section className={styles.header}>
                <div>
                  <p className={styles.eyebrow}>CESI ZEN</p>
        
                  <h1 className={styles.title}>Statistiques émotionnelles</h1>
        
                  <p className={styles.subtitle}>
                    Retrouvez une vue d’ensemble de votre journal d’émotions{" "}
                    {getPeriodLabel()}.
                  </p>
                </div>
        
                <div className={styles.periodSwitch}>
                  <button
                    type="button"
                    className={
                      period === "week"
                        ? `${styles.periodButton} ${styles.periodButtonActive}`
                        : styles.periodButton
                    }
                    onClick={() => setPeriod("week")}
                  >
                    Semaine
                  </button>
        
                  <button
                    type="button"
                    className={
                      period === "month"
                        ? `${styles.periodButton} ${styles.periodButtonActive}`
                        : styles.periodButton
                    }
                    onClick={() => setPeriod("month")}
                  >
                    Mois
                  </button>
                </div>
              </section>
    )
}