export function getFormattedTemp(temp: number): string {
  const updatedTemp = (temp = Math.round(temp));
  return `${updatedTemp}°C`;
}
