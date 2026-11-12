import type { SkillCategory } from '../__generated__/graphql.ts';

/** Display order and Russian labels; the API enum stays the source of truth. */
export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  LANGUAGE: 'Языки',
  BACKEND: 'Бэкенд',
  API: 'API',
  DATABASE: 'Базы данных',
  DEVOPS: 'DevOps',
  CLOUD: 'Облака',
  FRONTEND: 'Фронтенд',
  ARCHITECTURE: 'Архитектура',
  TESTING: 'Тестирование',
  TOOLING: 'Инструменты',
  AI: 'AI',
  OTHER: 'Другое',
};

const ORDER = Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[];

export interface SkillGroup<T> {
  category: SkillCategory;
  label: string;
  skills: T[];
}

/** Groups skills by category, keeping the API's order inside each group. */
export function groupSkills<T extends { category: SkillCategory }>(
  skills: readonly T[],
): SkillGroup<T>[] {
  return ORDER.map((category) => ({
    category,
    label: SKILL_CATEGORY_LABELS[category],
    skills: skills.filter((s) => s.category === category),
  })).filter((group) => group.skills.length > 0);
}
