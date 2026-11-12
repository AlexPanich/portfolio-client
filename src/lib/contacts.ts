import type { LinkType } from '../__generated__/graphql.ts';

interface Link {
  type: LinkType;
  url: string;
}

/** First link of the given type, e.g. the Telegram one for the main CTA. */
export function findLink<T extends Link>(
  links: readonly T[],
  type: LinkType,
): T | undefined {
  return links.find((link) => link.type === type);
}
