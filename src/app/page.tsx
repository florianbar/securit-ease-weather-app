import styles from "./page.module.css";

import Weather from "@/components/weather";

export default function Home() {  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Weather />
      </main>
    </div>
  );
}
