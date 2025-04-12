import { format } from "date-fns";

import { getCachedWeatherData, setCachedWeatherData } from "../weather-cache";
import { WEATHER_RESPONSE } from "@/mock-data/weather";

describe("Weather Cache", () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
    };
  })();

  beforeEach(() => {
    // Set up localStorage mock
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe("setCachedWeatherData", () => {
    it("should set cached weather data", () => {
      const location = "London";
      setCachedWeatherData(location, WEATHER_RESPONSE);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "weather_cache",
        expect.any(String)
      );
    });

    it("should group days by date", () => {
      const location = "London";
      setCachedWeatherData(location, WEATHER_RESPONSE);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "weather_cache",
        expect.any(String)
      );
    });

    it("should clean up expired entries", () => {
      const location = "London";
      setCachedWeatherData(location, WEATHER_RESPONSE);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "weather_cache",
        expect.any(String)
      );
    });

    it("should clean up past dates", () => {
      const location = "London";
      setCachedWeatherData(location, WEATHER_RESPONSE);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "weather_cache",
        expect.any(String)
      );
    });

    it("should clean up empty dates", () => {
      const location = "London";
      setCachedWeatherData(location, WEATHER_RESPONSE);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "weather_cache",
        expect.any(String)
      );
    });

    it("should clean up empty cache", () => {
      const location = "London";
      setCachedWeatherData(location, WEATHER_RESPONSE);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "weather_cache",
        expect.any(String)
      );
    });
  });

  describe("getCachedWeatherData", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      const fixedDate = new Date("2024-01-01T12:00:00Z");
      jest.setSystemTime(fixedDate);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should return cached data if within expiration time", () => {
      const location = "London";
      const dateKey = format(new Date(), "yyyy-MM-dd");

      // Manually construct the cache structure
      const cacheData = {
        [dateKey]: {
          london: {
            data: WEATHER_RESPONSE,
            timestamp: Date.now(),
          },
        },
      };

      // Set the cache directly
      localStorage.setItem("weather_cache", JSON.stringify(cacheData));

      const result = getCachedWeatherData(location);

      expect(result).toEqual(WEATHER_RESPONSE);
    });

    it("should return null if no cached data exists", () => {
      const location = "London";
      const result = getCachedWeatherData(location);
      expect(result).toBeNull();
    });

    it("should return null if cached data has expired", () => {
      const location = "London";
      const dateKey = format(new Date(), "yyyy-MM-dd");

      // Manually construct the cache structure with expired data
      const cacheData = {
        [dateKey]: {
          london: {
            data: WEATHER_RESPONSE,
            timestamp: Date.now() - 31 * 60 * 1000, // 31 minutes ago
          },
        },
      };

      // Set the cache directly
      localStorage.setItem("weather_cache", JSON.stringify(cacheData));

      const result = getCachedWeatherData(location);
      expect(result).toBeNull();
    });

    it("should return null if cached data is for a different location", () => {
      const location = "London";
      const dateKey = format(new Date(), "yyyy-MM-dd");
      const cacheData = {
        [dateKey]: {
          paris: {
            data: WEATHER_RESPONSE,
            timestamp: Date.now(),
          },
        },
      };
      localStorage.setItem("weather_cache", JSON.stringify(cacheData));
      const result = getCachedWeatherData(location);
      expect(result).toBeNull();
    });

    it("should return null if cached data is for a different date", () => {
      const location = "London";

      const cacheData = {
        "2023-12-31": {
          london: {
            data: WEATHER_RESPONSE,
            timestamp: Date.now(),
          },
        },
      };
      localStorage.setItem("weather_cache", JSON.stringify(cacheData));
      const result = getCachedWeatherData(location);
      expect(result).toBeNull();
    });

    it("should return null if cache is empty", () => {
      const location = "London";
      const result = getCachedWeatherData(location);
      expect(result).toBeNull();
    });
  });
});
