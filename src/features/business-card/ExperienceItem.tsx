import type { FragmentType } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import { ExperienceItem_ExperienceFragmentDoc } from '../../__generated__/graphql.ts';
import { formatDuration, formatPeriod } from '../../lib/format.ts';

export function ExperienceItem({
  experience,
}: {
  experience: FragmentType<typeof ExperienceItem_ExperienceFragmentDoc>;
}) {
  const { data, complete } = useFragment({
    fragment: ExperienceItem_ExperienceFragmentDoc,
    fragmentName: 'ExperienceItem_experience',
    from: experience,
  });
  if (!complete) return null;

  const { period } = data;
  return (
    <li className="grid gap-4 border-t border-border pt-8 pb-2 md:grid-cols-[200px_1fr] md:gap-12 xl:grid-cols-[200px_340px_1fr]">
      <div className="flex flex-col gap-1.5">
        <span className="caption text-fg">
          <time dateTime={period.startDate}>
            {formatPeriod(period.startDate, period.endDate)}
          </time>
        </span>
        <span className="caption text-fg-muted normal-case">
          {formatDuration(period.duration)}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading text-[26px] leading-tight font-medium">
          {data.companyUrl ? (
            <a
              href={data.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              {data.company}
            </a>
          ) : (
            data.company
          )}
        </h3>
        <p className="leading-[1.55]">{data.position}</p>
        {data.location && (
          <span className="caption text-fg-muted">{data.location}</span>
        )}
      </div>

      <div className="flex flex-col gap-4 md:col-start-2 xl:col-start-auto">
        {data.description && (
          <p className="leading-[1.55]">{data.description}</p>
        )}
        {data.achievements.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {data.achievements.map((achievement) => (
              <li
                key={achievement}
                className="flex gap-3 leading-[1.55] text-fg-secondary"
              >
                <span
                  className="font-mono text-sm text-accent"
                  aria-hidden="true"
                >
                  —
                </span>
                {achievement}
              </li>
            ))}
          </ul>
        )}
        {data.technologies.length > 0 && (
          <p className="font-mono text-xs leading-[1.6] tracking-[0.03em] text-fg-muted">
            <span className="sr-only">Стек: </span>
            {data.technologies.map((t) => t.name).join(' · ')}
          </p>
        )}
      </div>
    </li>
  );
}
