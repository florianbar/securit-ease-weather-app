"use client";

import { useWeatherStore } from "@/stores/weather";
import Form from "./form";
import SelectedDay from "./selected-day";
import Days from "./days";

function Weather() {
  const {
    days,
    selectedDay,
    loading,
    error,
    actions: { fetchWeather, selectDay },
  } = useWeatherStore();

  return (
    <>
      <h1>Weather App</h1>

      <Form
        disabled={loading}
        onSubmit={(location: string) => fetchWeather(location)}
      />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {selectedDay && <SelectedDay day={selectedDay} />}

      {days?.length > 0 && (
        <Days
          items={days}
          selectedDay={selectedDay}
          onSelect={(datetime: string) => selectDay(datetime)}
        />
      )}
    </>
  );
}

export default Weather;
