import { WeatherResponseDay } from "@/types/weather";

interface SelectedDayProps {
  day: WeatherResponseDay;
}

function SelectedDay({ day }: SelectedDayProps) {
  return (
    <div style={{margin: "2rem 0"}}>
      <h2>Selected Day</h2>
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