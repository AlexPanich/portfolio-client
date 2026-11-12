import {
  formatDuration,
  formatDurationLong,
  formatMonth,
  formatPeriod,
  plural,
} from './format.ts';

describe('plural', () => {
  it.each([
    [1, 'год'],
    [2, 'года'],
    [4, 'года'],
    [5, 'лет'],
    [11, 'лет'],
    [12, 'лет'],
    [21, 'год'],
    [22, 'года'],
    [111, 'лет'],
  ])('%i -> %s', (n, expected) => {
    expect(plural(n, ['год', 'года', 'лет'])).toBe(expected);
  });
});

describe('dates', () => {
  it('formats a month from an ISO date without timezone shifts', () => {
    expect(formatMonth('2026-02-01')).toBe('фев 2026');
    expect(formatMonth('2016-12-01')).toBe('дек 2016');
  });

  it('formats open and closed periods', () => {
    expect(formatPeriod('2025-01-01', '2025-12-01')).toBe(
      'янв 2025 — дек 2025',
    );
    expect(formatPeriod('2025-01-01', null)).toBe('янв 2025 — н. в.');
  });
});

describe('durations', () => {
  it('omits zero parts', () => {
    expect(formatDuration({ years: 4, months: 1 })).toBe('4 года 1 мес');
    expect(formatDuration({ years: 1, months: 0 })).toBe('1 год');
    expect(formatDuration({ years: 0, months: 5 })).toBe('5 мес');
    expect(formatDuration({ years: 0, months: 0 })).toBe('меньше месяца');
  });

  it('has a long form for headings', () => {
    expect(formatDurationLong({ years: 10, months: 1 })).toBe('10 лет 1 месяц');
    expect(formatDurationLong({ years: 2, months: 3 })).toBe('2 года 3 месяца');
    expect(formatDurationLong({ years: 5, months: 0 })).toBe('5 лет');
  });
});
