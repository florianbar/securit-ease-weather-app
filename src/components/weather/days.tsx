import Image from "next/image";

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

        const dayOfWeek = new Date(day.datetime).toLocaleDateString("en-US", {
          weekday: "short",
        });
        const temp = (day.temp = Math.round(day.temp));

        return (
          <div
            className={`${styles.day} ${isSelected ? styles.selected : ""}`}
            key={day.datetime}
            onClick={() => onSelect(day.datetime)}
            style={{ marginBottom: "2rem", cursor: "pointer" }}
          >
            <p className={styles.dayOfWeek}>{dayOfWeek}</p>
            <Image
              src={`/icons/${day.icon}.svg`}
              alt={day.conditions}
              width={50}
              height={50}
              className={styles.icon}
            />
            {/* {isToday && <p><strong>Today</strong></p>} */}
            {/* <p>{day.conditions}</p> */}
            {/* <p>{day.datetime}</p> */}
            <p className={styles.temp}>{temp} °C</p>
          </div>
        );
      })}
    </div>
  );
}

export default Days;
