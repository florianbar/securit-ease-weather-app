import { WeatherResponse } from "@/types/weather";
import { parseISO, addMinutes, isBefore, format } from "date-fns";

type CacheMap = {
  [date: string]: {
    [location: string]: {
      data: WeatherResponse;
      timestamp: number;
    };
  };
};

const CACHE_KEY = "weather_cache";
const CACHE_DURATION_MINUTES = 30;

function cleanLocation(location: string): string {
  return location.toLowerCase().replace(/\s+/g, "");
}

export const setCachedWeatherData = (
  location: string,
  data: WeatherResponse
): void => {
  try {
    // Get existing cache or initialize new one
    const existingCache = localStorage.getItem(CACHE_KEY);
    const cache: CacheMap = existingCache ? JSON.parse(existingCache) : {};

    // Group days by date
    const dateKey = format(new Date(), "yyyy-MM-dd");
    if (!cache[dateKey]) {
      cache[dateKey] = {};
    }

    cache[dateKey][cleanLocation(location)] = {
      data,
      timestamp: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
};

export const getCachedWeatherData = (
  location: string
): WeatherResponse | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cache: CacheMap = JSON.parse(cached);
    const dateKey = format(new Date(), "yyyy-MM-dd");

    // Clean up expired entries
    const cleanedCache: CacheMap = {};
    let hasChanges = false;

    Object.entries(cache).forEach(([date, locations]) => {
      const parsedDate = parseISO(date);

      // Skip if day is in the past
      if (isBefore(parsedDate, new Date().setHours(0, 0, 0, 0))) {
        hasChanges = true;
        return;
      }

      cleanedCache[date] = {};

      Object.entries(locations).forEach(([locationItem, entry]) => {
        const expirationTime = addMinutes(
          new Date(entry.timestamp),
          CACHE_DURATION_MINUTES
        );

        // Skip if entry has expired
        if (isBefore(expirationTime, new Date())) {
          hasChanges = true;
          return;
        }

        cleanedCache[date][cleanLocation(locationItem)] = entry;
      });

      // Remove date if no locations remain
      if (Object.keys(cleanedCache[date]).length === 0) {
        delete cleanedCache[date];
        hasChanges = true;
      }
    });

    // Update storage if we cleaned anything
    if (hasChanges) {
      if (Object.keys(cleanedCache).length === 0) {
        localStorage.removeItem(CACHE_KEY);
      } else {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cleanedCache));
      }
    }

    // Return requested data if available
    return cleanedCache[dateKey]?.[cleanLocation(location)]?.data || null;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
};
