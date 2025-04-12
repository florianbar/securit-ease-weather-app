import styles from "./page.module.scss";

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
