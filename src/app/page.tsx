import styles from "./page.module.css";

import { fetchWeather } from "@/utils/weather-api";

export default async function Home() {  
  const weatherResponse = await fetchWeather('Cape Town, South Africa');
  console.log("weatherResponse", weatherResponse);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Weather App
      </main>
    </div>
  );
}
