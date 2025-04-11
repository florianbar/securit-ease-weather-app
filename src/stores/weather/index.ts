import { create } from "zustand";

import { WeatherResponse } from "@/types/weather";
import { WeatherStoreState } from "./types";
import { fetchWeather } from "./api";

const initialState = {
  days: [],
  selectedDay: null,
  loading: false,
  error: null,
};

export const useWeatherStore = create<WeatherStoreState>((set, get) => ({
  ...initialState,
  actions: {
    fetchWeather: async (location: string) => {
      set({ loading: true, error: null });

      try {
        const response: WeatherResponse = await fetchWeather(location);
        set({ days: response.days, selectedDay: response.days[3] });
      } catch (error) {
        console.error(error);
        set({
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      } finally {
        set({ loading: false });
      }
    },

    selectDay: (datetime: string) => {
      const day = get().days.find((day) => day.datetime === datetime);
      set({ selectedDay: day });
    },
  },
}));
