import styles from "./page.module.css";

import { fetchCurrentWeather } from "@/utils/weather-api";

export default async function Home() {  
  const currentWeather = await fetchCurrentWeather('Cape Town, South Africa');
  console.log("currentWeather", currentWeather);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Weather App
      </main>
    </div>
  );
}
