"use client";

import { useEffect, useState } from "react";

import { useWeatherStore } from "@/stores/weather";

function Weather() {
  const { 
    weather, 
    loading, 
    error, 
    actions: { 
      fetchWeather 
    }
  } = useWeatherStore();

  const [enteredLocation, setEnteredLocation] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setFormError("");
    setEnteredLocation(event.target.value);
  }

  function handleFormSubmit (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFormError("");

    if (!enteredLocation) {
      setFormError("Please enter a location");
      return;
    }

    fetchWeather(enteredLocation);
  }

  useEffect(() => {
    console.log("Weather", weather);
  }, [weather]);

  return (
    <div>
      <h1>Weather</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            placeholder="Enter a location" 
            value={enteredLocation} 
            onChange={handleLocationChange}
          />
          {formError && <p>{formError}</p>}
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Weather;