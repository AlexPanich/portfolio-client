import type { FragmentType } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import { Mail, Send } from 'lucide-react';
import type { ReactNode } from 'react';
import { Hero_ProfileFragmentDoc } from '../../__generated__/graphql.ts';
import { GithubIcon } from '../../components/GithubIcon.tsx';
import { findLink } from '../../lib/contacts.ts';
import { formatDurationLong, plural } from '../../lib/format.ts';

/** "Fullstack-разработчик · TypeScript, Node.js, React · AI-first" -> caption parts. */
const headlineCaption = (headline: string) =>
  headline.replaceAll(',', ' ·').toUpperCase();

function Annotation({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className={`absolute flex items-center gap-2.5 ${className}`}>
      <span className="h-px w-10 bg-fg" aria-hidden="true" />
      <div className="flex flex-col gap-0.5 rounded bg-white/90 px-2.5 py-1.5 backdrop-blur-sm">
        <span className="caption text-[10px] text-fg-muted">{label}</span>
        <span className="font-mono text-xs text-fg">{value}</span>
      </div>
    </div>
  );
}

function ActionLink({
  href,
  primary,
  children,
}: {
  href: string;
  primary?: boolean;
  children: ReactNode;
}) {
  const base =
    'inline-flex items-center gap-2 rounded-ds px-5 py-3.5 text-[15px] transition-colors';
  const style = primary
    ? 'bg-accent font-medium text-fg-inverse hover:bg-accent-hover'
    : 'border border-border text-fg hover:border-fg';
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer"
      className={`${base} ${style}`}
    >
      {children}
    </a>
  );
}

export function Hero({
  profile,
}: {
  profile: FragmentType<typeof Hero_ProfileFragmentDoc>;
}) {
  const { data, complete } = useFragment({
    fragment: Hero_ProfileFragmentDoc,
    fragmentName: 'Hero_profile',
    from: profile,
  });
  if (!complete) return null;

  const [firstName, ...rest] = data.name.split(' ');
  const telegram = findLink(data.links, 'TELEGRAM');
  const github = findLink(data.links, 'GITHUB');
  const email = findLink(data.links, 'EMAIL');
  const experience = formatDurationLong(data.totalExperience);
  const stats = [
    [
      data.experience.length,
      plural(data.experience.length, [
        'место работы',
        'места работы',
        'мест работы',
      ]),
    ],
    [
      data.projects.length,
      plural(data.projects.length, ['проект', 'проекта', 'проектов']),
    ],
    [
      data.skills.length,
      plural(data.skills.length, ['навык', 'навыка', 'навыков']),
    ],
  ] as const;

  return (
    <section
      id="top"
      aria-label="Профиль"
      className="grid gap-10 px-5 pb-16 md:px-16 lg:grid-cols-[1fr_minmax(0,576px)] lg:gap-0 lg:pb-20"
    >
      <div className="relative order-first aspect-[4/5] max-h-[740px] overflow-hidden rounded-ds bg-surface-muted lg:order-last">
        {data.avatar ? (
          <img
            src={data.avatar.url}
            alt={data.name}
            className="size-full object-cover"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center font-heading text-[160px] font-semibold text-border-strong"
            aria-hidden="true"
          >
            АП
          </div>
        )}
        {data.location && (
          <Annotation
            label="FIG. 1 · ЛОКАЦИЯ"
            value={`${data.location} · удалённо / гибрид`}
            className="top-6 left-0 sm:top-14"
          />
        )}
        <Annotation
          label="СТАЖ"
          value={experience}
          className="right-6 bottom-6 flex-row-reverse sm:bottom-10"
        />
      </div>

      <div className="flex flex-col justify-between gap-12 lg:pt-24 lg:pr-12">
        <div className="flex flex-col gap-7">
          <span className="caption text-accent">
            {headlineCaption(data.headline)}
          </span>
          <h1 className="font-heading text-[56px] leading-[0.95] font-semibold tracking-[-0.035em] sm:text-[88px] xl:text-[124px]">
            {/* The space keeps the accessible name "Имя Фамилия". */}
            {firstName} <br />
            {rest.join(' ')}
          </h1>
          <p className="max-w-[560px] text-lg leading-[1.55] text-fg-secondary">
            {data.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {telegram && (
              <ActionLink href={telegram.url} primary>
                Написать в Telegram{' '}
                <Send className="size-4" aria-hidden="true" />
              </ActionLink>
            )}
            {github && (
              <ActionLink href={github.url}>
                <GithubIcon className="size-4" /> GitHub
              </ActionLink>
            )}
            {email && (
              <ActionLink href={email.url}>
                <Mail className="size-4" aria-hidden="true" /> E-mail
              </ActionLink>
            )}
          </div>
        </div>
        <dl className="flex gap-12">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse gap-1">
              <dt className="caption text-[11px] text-fg-muted">{label}</dt>
              <dd className="font-heading text-[40px] leading-none font-medium">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
