import type { FragmentType } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import { ArrowUpRight } from 'lucide-react';
import { Nav_ProfileFragmentDoc } from '../../__generated__/graphql.ts';
import { findLink } from '../../lib/contacts.ts';

const SECTIONS = [
  ['experience', 'Опыт'],
  ['projects', 'Проекты'],
  ['skills', 'Навыки'],
  ['how-it-works', 'Как сделано'],
] as const;

export function Nav({
  profile,
}: {
  profile: FragmentType<typeof Nav_ProfileFragmentDoc>;
}) {
  const { data, complete } = useFragment({
    fragment: Nav_ProfileFragmentDoc,
    fragmentName: 'Nav_profile',
    from: profile,
  });
  const telegram = complete ? findLink(data.links, 'TELEGRAM') : undefined;

  return (
    <nav
      className="flex items-center justify-between px-5 py-6 md:px-16 md:py-7"
      aria-label="Основная навигация"
    >
      <a href="#top" className="flex items-center gap-2.5">
        <span className="font-heading text-lg font-bold">АП</span>
        <span className="caption hidden text-fg-muted normal-case sm:inline">
          portfolio-api · GraphQL
        </span>
      </a>
      <div className="flex items-center gap-9">
        <ul className="hidden items-center gap-9 lg:flex">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-[15px] transition-colors hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        {telegram && (
          <a
            href={telegram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-ds bg-fg px-4.5 py-2.5 text-sm font-medium text-fg-inverse transition-opacity hover:opacity-85"
          >
            Написать в Telegram
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </nav>
  );
}
