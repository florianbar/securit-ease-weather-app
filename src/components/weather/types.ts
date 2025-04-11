import { WeatherResponseDay } from "@/types/weather";

export interface FormProps {
  onSubmit: (location: string) => void;
}

export interface DaysProps {
  items: WeatherResponseDay[];
  selectedDay: WeatherResponseDay | null;
  onSelect: (datetime: string) => void;
}

export interface SelectedDayProps {
  day: WeatherResponseDay;
}