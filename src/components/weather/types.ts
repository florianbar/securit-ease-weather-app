import { WeatherResponseDay } from "@/types/weather";

export interface FormProps {
  onSubmit: (location: string) => void;
}

export interface DaysProps {
  items: WeatherResponseDay[];
  onSelect: (datetime: string) => void;
}

export interface SelectedDayProps {
  day: WeatherResponseDay;
}