import { render, screen, fireEvent } from "@testing-library/react";
import { format } from "date-fns";

import Days from "../days";
import { WEATHER_RESPONSE } from "@/mock-data/weather";

describe("Days", () => {
  const mockOnSelect = jest.fn();
  const mockDays = WEATHER_RESPONSE.days;
  const defaultProps = {
    items: mockDays,
    selectedDay: mockDays[0],
    onSelect: mockOnSelect,
  };

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders all days correctly", () => {
    render(<Days {...defaultProps} />);

    mockDays.forEach((day) => {
      const formattedTemp = `${Math.round(day.temp)}°C`;
      const dayOfWeek = format(new Date(day.datetime), "EEE");

      const dayElement = screen.getByText(dayOfWeek).closest("div");
      expect(dayElement).toHaveTextContent(dayOfWeek);
      expect(dayElement).toHaveTextContent(formattedTemp);
      expect(
        dayElement?.querySelector(`img[alt="${day.conditions}"]`)
      ).toBeInTheDocument();
    });
  });

  it("applies selected class to the selected day", () => {
    render(<Days {...defaultProps} />);

    const selectedDayElement = screen
      .getByText(format(new Date(mockDays[0].datetime), "EEE"))
      .closest("div");

    expect(selectedDayElement).toHaveClass("selected");
  });

  it("calls onSelect with correct datetime when a day is clicked", () => {
    render(<Days {...defaultProps} />);

    // Click the second day
    const secondDayElement = screen
      .getByText(format(new Date(mockDays[1].datetime), "EEE"))
      .closest("div");
    fireEvent.click(secondDayElement!);

    expect(mockOnSelect).toHaveBeenCalledWith(mockDays[1].datetime);
  });

  it("renders correctly without a selected day", () => {
    render(<Days {...defaultProps} selectedDay={null} />);

    // Verify no day has the selected class
    const dayElements = screen
      .getAllByRole("img")
      .map((img) => img.closest("div"));
    dayElements.forEach((element) => {
      expect(element).not.toHaveClass("selected");
    });
  });

  it("renders weather icons with correct paths", () => {
    render(<Days {...defaultProps} />);

    mockDays.forEach((day) => {
      const dayElement = screen
        .getByText(format(new Date(day.datetime), "EEE"))
        .closest("div");
      const icon = dayElement?.querySelector(`img[alt="${day.conditions}"]`);
      expect(icon).toHaveAttribute("src", expect.stringContaining(day.icon));
    });
  });
});
