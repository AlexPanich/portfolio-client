const MONTHS = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

/** Russian plural form: plural(1, ['год','года','лет']) -> 'год'. */
export function plural(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

/** "2026-02-01" -> "фев 2026" (dates come from the API as YYYY-MM-DD). */
export function formatMonth(isoDate: string): string {
  const [year, month] = isoDate.split('-').map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'н. в.'}`;
}

/** { years: 4, months: 1 } -> "4 года 1 мес"; zero parts are omitted. */
export function formatDuration({
  years,
  months,
}: {
  years: number;
  months: number;
}): string {
  const parts: string[] = [];
  if (years > 0)
    parts.push(`${years} ${plural(years, ['год', 'года', 'лет'])}`);
  if (months > 0) parts.push(`${months} мес`);
  return parts.join(' ') || 'меньше месяца';
}

/** Long form for headings: "10 лет 1 месяц". */
export function formatDurationLong(d: {
  years: number;
  months: number;
}): string {
  const months =
    d.months > 0
      ? ` ${d.months} ${plural(d.months, ['месяц', 'месяца', 'месяцев'])}`
      : '';
  return `${d.years} ${plural(d.years, ['год', 'года', 'лет'])}${months}`;
}
