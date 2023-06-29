export default function tryParseInt(value: string | null): number | undefined {
  if (value === null) {
    return undefined;
  }

  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return undefined;
  }

  return parsedValue;
}
