import { render, screen } from "@testing-library/react";

import SelectedDay from "../selected-day";
import { WeatherResponseDay } from "@/types/weather";

describe("SelectedDay", () => {
  const mockDay: WeatherResponseDay = {
    datetime: "2025-04-08",
    tempmax: 58.9,
    tempmin: 44.1,
    windgust: 23.0,
    precip: 0.0,
    pressure: 1022.5,
    conditions: "Partially cloudy",
    icon: "partly-cloudy-day",
  } as WeatherResponseDay;

  it("renders weather icon with correct attributes", () => {
    render(<SelectedDay day={mockDay} />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute(
      "src",
      expect.stringContaining("partly-cloudy-day.svg")
    );
    expect(icon).toHaveAttribute("alt", "Partially cloudy");
    expect(icon).toHaveAttribute("width", "50");
    expect(icon).toHaveAttribute("height", "50");
  });

  it("displays weather conditions text", () => {
    render(<SelectedDay day={mockDay} />);

    expect(screen.getByText("Partially cloudy")).toBeInTheDocument();
  });

  it("displays formatted temperature values", () => {
    render(<SelectedDay day={mockDay} />);

    expect(screen.getByText("59°C")).toBeInTheDocument(); // tempmax rounded
    expect(screen.getByText("44°C")).toBeInTheDocument(); // tempmin rounded
  });

  it("displays weather details with correct units", () => {
    render(<SelectedDay day={mockDay} />);

    expect(screen.getByText("Wind: 23 km/h")).toBeInTheDocument();
    expect(screen.getByText("Precip: 0 mm")).toBeInTheDocument();
    expect(screen.getByText("Pressure: 1022.5 mb")).toBeInTheDocument();
  });

  it("maintains correct structure with CSS classes", () => {
    const { container } = render(<SelectedDay day={mockDay} />);

    expect(container.querySelector(".selectedDay")).toBeInTheDocument();
    expect(container.querySelector(".selectedDayIcon")).toBeInTheDocument();
    expect(container.querySelector(".selectedDayDetails")).toBeInTheDocument();
    expect(container.querySelector(".selectedDayTemp")).toBeInTheDocument();
    expect(container.querySelector(".selectedDayInfo")).toBeInTheDocument();
  });
});
