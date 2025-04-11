import { create } from "zustand";

import { WeatherResponse } from "@/types/weather";
import { WeatherStoreState } from "./types";
import { fetchWeather } from "./api";

const initialState = {
  weather: null,
  loading: false,
  error: null,
};

export const useWeatherStore = create<WeatherStoreState>((set) => ({
  ...initialState,
  actions: {
    fetchWeather: async (location: string) => {
      set({ loading: true, error: null });

      try {
        const response: WeatherResponse = await fetchWeather(location);
        set({ weather: response });
      } catch (error) {
        console.error(error);
        set({ error: error instanceof Error ? error.message : "An unknown error occurred" });
      } finally {
        set({ loading: false });
      }
    },
  }
}));
