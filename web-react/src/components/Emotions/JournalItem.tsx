import styles from "./module.JournalStats.module.css"

type StatItem = {
  id: number;
  nom: string;
  couleur: string | null;
  count: number;
};

type Props = {
  items: StatItem[];
};
export default function JournalItem({items}:Readonly<Props>){

    return(
        <div className={styles.statList}>
        {items.map((item) => (
          <div className={styles.statItem} key={item.id}>
            <div className={styles.statItemName}>
              <span
                className={styles.colorDot}
                style={{ backgroundColor: item.couleur ?? "#5D7052" }}
              />

              <span>{item.nom}</span>
            </div>

            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
    )
}