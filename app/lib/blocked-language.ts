const blockedLanguagePatterns = [
  /(?:^|\s)n(?:\s*i)+(?:\s*g){2,}(?:(?:\s*[ae])+)?(?:\s*r)+(?:\s*s)?(?=$|\s)/,
  /(?:^|\s)f(?:\s*a)+(?:\s*g){2,}(?:\s*o)+(?:\s*t)+(?:\s*s)?(?=$|\s)/,
  /(?:^|\s)c(?:\s*h)+(?:\s*i)+(?:\s*n)+(?:\s*k)+(?:\s*s)?(?=$|\s)/,
  /(?:^|\s)k(?:\s*i)+(?:\s*k)+(?:\s*e)+(?:\s*s)?(?=$|\s)/,
  /(?:^|\s)s(?:\s*p)+(?:\s*i)+(?:\s*c)+(?:\s*k)?(?:\s*s)?(?=$|\s)/,
] as const;

const characterSubstitutions: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "!": "i",
  $: "s",
  "@": "a",
  "|": "i",
  а: "a",
  е: "e",
  і: "i",
  к: "k",
  о: "o",
  р: "p",
  с: "c",
  т: "t",
  х: "x",
  у: "y",
};

export function containsBlockedLanguage(text: string) {
  const normalizedText = normalizeForBlockedLanguage(text);

  return blockedLanguagePatterns.some((pattern) =>
    pattern.test(normalizedText),
  );
}

function normalizeForBlockedLanguage(text: string) {
  return Array.from(
    text
      .normalize("NFKD")
      .toLowerCase()
      .replace(/\p{Mark}/gu, ""),
  )
    .map((character) => characterSubstitutions[character] ?? character)
    .join("")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}
