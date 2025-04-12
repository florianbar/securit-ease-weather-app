import { render, screen, fireEvent } from "@testing-library/react";

import Form from "../form";

describe("Form", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // Clear mock calls between tests
    mockOnSubmit.mockClear();
  });

  it("renders the form with input field", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText("Enter a location")).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText("Enter a location");
    fireEvent.change(input, { target: { value: "London" } });

    expect(input).toHaveValue("London");
  });

  it("shows error message when submitting empty form", async () => {
    render(<Form onSubmit={mockOnSubmit} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(screen.getByText("Please enter a location")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with entered location when form is submitted", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText("Enter a location");
    fireEvent.change(input, { target: { value: "London" } });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalledWith("London");
    expect(
      screen.queryByText("Please enter a location")
    ).not.toBeInTheDocument();
  });

  it("clears error message when user starts typing", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    // First submit empty form to show error
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(screen.getByText("Please enter a location")).toBeInTheDocument();

    // Then type something
    const input = screen.getByPlaceholderText("Enter a location");
    fireEvent.change(input, { target: { value: "L" } });

    expect(
      screen.queryByText("Please enter a location")
    ).not.toBeInTheDocument();
  });

  it("disables input field when disabled prop is true", () => {
    render(<Form onSubmit={mockOnSubmit} disabled={true} />);

    const input = screen.getByPlaceholderText("Enter a location");
    expect(input).toBeDisabled();
  });
});
