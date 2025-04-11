"use client";

import { useEffect } from "react";

import { useWeatherStore } from "@/stores/weather";

function Weather () {
  const { weather, loading, error, actions: { fetchWeather } } = useWeatherStore();

  useEffect(() => {
    fetchWeather("CapeTown");
  }, [fetchWeather]);

  useEffect(() => {
    console.log("Weather", weather);
  }, [weather]);

  return (
    <div>
      <h1>Weather</h1>
    </div>
  );
}

export default Weather;