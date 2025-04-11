import { WeatherResponseDay } from "@/types/weather";
import { DaysProps } from "./types";
import styles from "./styles.module.scss";

function Days({ items, selectedDay, onSelect }: DaysProps) {
  return (
    <div className={styles.days}>
      {items.map((day: WeatherResponseDay) => {
        const today = new Date().toISOString().split("T")[0];
        const isToday = day.datetime === today;

        const isSelected = selectedDay?.datetime === day.datetime;

        return (
          <div 
            className={`${styles.day} ${isSelected ? styles.selected : ""}`}
            key={day.datetime}
            onClick={() => onSelect(day.datetime)}
            style={{marginBottom: "2rem", cursor: "pointer"}} 
          >
            {isToday && <p><strong>Today</strong></p>}
            <p>{day.datetime}</p>
            <p>{day.temp} °C</p>
          </div>
        );
      })}
    </div>
  );
}

export default Days;