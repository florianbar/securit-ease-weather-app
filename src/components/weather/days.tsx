import { WeatherResponseDay } from "@/types/weather";
import { DaysProps } from "./types";

function Days({ items, onSelect }: DaysProps) {
  return items.map((day: WeatherResponseDay) => {
    const today = new Date().toISOString().split("T")[0];
    const isToday = day.datetime === today;

    return (
      <div 
        key={day.datetime}
        onClick={() => onSelect(day.datetime)}
        style={{marginBottom: "2rem", cursor: "pointer"}} 
      >
        {isToday && <p><strong>Today</strong></p>}
        <p>{day.datetime}</p>
        <p>{day.temp} °C</p>
      </div>
    );
  });
}

export default Days;