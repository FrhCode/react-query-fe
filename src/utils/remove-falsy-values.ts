export default function removeFalsyValues<T extends object>(obj: T) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {} as any) as Partial<Record<keyof T, string>>;
}
