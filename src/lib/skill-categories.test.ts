import { groupSkills } from './skill-categories.ts';

describe('groupSkills', () => {
  it('groups by category in display order, keeping API order inside groups', () => {
    const groups = groupSkills([
      { name: 'React', category: 'FRONTEND' },
      { name: 'TypeScript', category: 'LANGUAGE' },
      { name: 'Next.js', category: 'FRONTEND' },
      { name: 'NestJS', category: 'BACKEND' },
    ] as const);

    expect(groups.map((g) => [g.label, g.skills.map((s) => s.name)])).toEqual([
      ['Языки', ['TypeScript']],
      ['Бэкенд', ['NestJS']],
      ['Фронтенд', ['React', 'Next.js']],
    ]);
  });

  it('drops empty categories', () => {
    expect(groupSkills([])).toEqual([]);
  });
});
