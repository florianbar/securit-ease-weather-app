import Image from "next/image";

import { getFormattedTemp } from "@/utils/weather";
import { SelectedDayProps } from "./types";
import styles from "./styles.module.scss";

function SelectedDay({ day }: SelectedDayProps) {
  return (
    <div className={styles.selectedDay}>
      <div className={styles.selectedDayIcon}>
        <Image
          src={`/icons/${day.icon}.svg`}
          alt={day.conditions}
          width={50}
          height={50}
        />
        <p>{day.conditions}</p>
      </div>
      <div className={styles.selectedDayDetails}>
        <div className={styles.selectedDayTemp}>
          <p className={styles.maxTemp}>
            {getFormattedTemp(day.tempmax as number)}
          </p>
          <p className={styles.minTemp}>
            {getFormattedTemp(day.tempmin as number)}
          </p>
        </div>
        <div className={styles.selectedDayInfo}>
          <p>Wind: {day.windgust} km/h</p>
          <p>Precip: {day.precip} mm</p>
          <p>Pressure: {day.pressure} mb</p>
        </div>
      </div>
    </div>
  );
}

export default SelectedDay;
