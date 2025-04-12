import { getFormattedTemp } from "../weather";

describe("getFormattedTemp", () => {
  it("should round the temperature and add °C suffix", () => {
    expect(getFormattedTemp(23.6)).toBe("24°C");
    expect(getFormattedTemp(23.2)).toBe("23°C");
    expect(getFormattedTemp(-5.7)).toBe("-6°C");
  });

  it("should handle whole numbers without changes", () => {
    expect(getFormattedTemp(20)).toBe("20°C");
    expect(getFormattedTemp(-10)).toBe("-10°C");
    expect(getFormattedTemp(0)).toBe("0°C");
  });
});
