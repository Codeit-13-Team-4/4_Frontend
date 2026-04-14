export function cleanDescription(description: string) {
  return description
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}
