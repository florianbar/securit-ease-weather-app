import Image from "next/image";

import { SelectedDayProps } from "./types";
import styles from "./styles.module.scss";

function SelectedDay({ day }: SelectedDayProps) {
  return (
    <div>
      <Image
        src={`/icons/${day.icon}.svg`}
        alt={day.conditions}
        width={50}
        height={50}
        className={styles.largeIcon}
      />
      <p>{day.datetime}</p>
      <p>Wind: {day.windgust} km/h</p>
      <p>Precip: {day.precip} mm</p>
      <p>Pressure: {day.pressure} mb</p>
      <p>Max: {day.tempmax} °C</p>
      <p>Min: {day.tempmin} °C</p>
    </div>
  );
}

export default SelectedDay;
