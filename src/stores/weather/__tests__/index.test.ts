import { act } from "@testing-library/react";

import {
  getCachedWeatherData,
  setCachedWeatherData,
} from "@/utils/weather-cache";
import { WEATHER_RESPONSE } from "@/mock-data/weather";
import { useWeatherStore } from "..";
import { fetchWeather } from "../api";

// Mock the dependencies
jest.mock("@/utils/weather-cache");
jest.mock("../api");

describe("useWeatherStore", () => {
  const mockFetchWeather = fetchWeather as jest.MockedFunction<
    typeof fetchWeather
  >;
  const mockGetCache = getCachedWeatherData as jest.MockedFunction<
    typeof getCachedWeatherData
  >;
  const mockSetCache = setCachedWeatherData as jest.MockedFunction<
    typeof setCachedWeatherData
  >;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Reset the store state
    act(() => {
      useWeatherStore.setState({
        days: [],
        selectedDay: null,
        loading: false,
        error: null,
      });
    });
  });

  describe("fetchWeather", () => {
    it("should fetch weather data from API when no cache exists", async () => {
      mockGetCache.mockReturnValue(null);
      mockFetchWeather.mockResolvedValue(WEATHER_RESPONSE);

      await act(async () => {
        await useWeatherStore.getState().actions.fetchWeather("London");
      });

      expect(mockFetchWeather).toHaveBeenCalledWith("London");
      expect(mockSetCache).toHaveBeenCalledWith("London", WEATHER_RESPONSE);
      expect(useWeatherStore.getState()).toEqual(
        expect.objectContaining({
          days: WEATHER_RESPONSE.days,
          selectedDay: WEATHER_RESPONSE.days[3],
          loading: false,
          error: null,
        })
      );
    });

    it("should use cached weather data when available", async () => {
      mockGetCache.mockReturnValue(WEATHER_RESPONSE);

      await act(async () => {
        await useWeatherStore.getState().actions.fetchWeather("London");
      });

      expect(mockFetchWeather).not.toHaveBeenCalled();
      expect(mockSetCache).not.toHaveBeenCalled();
      expect(useWeatherStore.getState()).toEqual(
        expect.objectContaining({
          days: WEATHER_RESPONSE.days,
          selectedDay: WEATHER_RESPONSE.days[3],
          loading: false,
          error: null,
        })
      );
    });

    it("should handle API errors correctly", async () => {
      const errorMessage = "API Error";
      mockGetCache.mockReturnValue(null);
      mockFetchWeather.mockRejectedValue(new Error(errorMessage));

      await act(async () => {
        await useWeatherStore.getState().actions.fetchWeather("London");
      });

      expect(useWeatherStore.getState()).toEqual(
        expect.objectContaining({
          days: [],
          selectedDay: null,
          loading: false,
          error: errorMessage,
        })
      );
    });

    it("should handle non-Error objects in catch block", async () => {
      mockGetCache.mockReturnValue(null);
      mockFetchWeather.mockRejectedValue("Unknown error");

      await act(async () => {
        await useWeatherStore.getState().actions.fetchWeather("London");
      });

      expect(useWeatherStore.getState()).toEqual(
        expect.objectContaining({
          days: [],
          selectedDay: null,
          loading: false,
          error: "An unknown error occurred",
        })
      );
    });
  });

  describe("selectDay", () => {
    it("should select a day by datetime", () => {
      // Setup initial state with days
      act(() => {
        useWeatherStore.setState({ days: WEATHER_RESPONSE.days });
      });

      const targetDateTime = WEATHER_RESPONSE.days[1].datetime;

      act(() => {
        useWeatherStore.getState().actions.selectDay(targetDateTime);
      });

      expect(useWeatherStore.getState().selectedDay).toEqual(
        WEATHER_RESPONSE.days[1]
      );
    });

    it("should set selectedDay to undefined when datetime not found", () => {
      // Setup initial state with days
      act(() => {
        useWeatherStore.setState({
          days: WEATHER_RESPONSE.days,
          selectedDay: WEATHER_RESPONSE.days[0],
        });
      });

      act(() => {
        useWeatherStore.getState().actions.selectDay("non-existent-date");
      });

      expect(useWeatherStore.getState().selectedDay).toBeUndefined();
    });
  });
});
