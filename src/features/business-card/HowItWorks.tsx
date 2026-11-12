import { ArrowUpRight } from 'lucide-react';
import { useLastRequestTiming } from '../../apollo/request-timing.ts';
import { GithubIcon } from '../../components/GithubIcon.tsx';

const API_REPO = 'https://github.com/AlexPanich/portfolio-api';
const CLIENT_REPO = 'https://github.com/AlexPanich/portfolio-client';

interface HowItWorksProps {
  /** The page query exactly as sent, with fragment spreads. */
  query: string;
  operationName: string;
  /** All fragments the query is composed of, nested ones included. */
  fragmentCount: number;
  sandboxUrl: string;
}

export function HowItWorks({
  query,
  operationName,
  fragmentCount,
  sandboxUrl,
}: HowItWorksProps) {
  const timing = useLastRequestTiming();

  return (
    <section
      aria-labelledby="how-it-works"
      className="grid gap-14 bg-surface-inverse px-5 py-20 text-fg-inverse md:px-16 md:py-26 lg:grid-cols-[520px_1fr] lg:gap-20"
    >
      <div className="flex flex-col gap-6">
        <span className="caption text-accent">04 / Как сделано</span>
        <h2
          id="how-it-works"
          className="font-heading text-[36px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-[44px]"
        >
          Эта страница —<br />
          один GraphQL-запрос
        </h2>
        <p className="text-[17px] leading-[1.6] text-fg-inverse-secondary">
          Клиент на React и Apollo Client отправляет один запрос, собранный из
          фрагментов: каждая секция сама объявляет нужные ей поля. Бэкенд на
          NestJS собирает граф за 8 SQL-запросов — по одному на связь, сколько
          бы ни было записей. Фото отдаётся по временной подписанной ссылке из
          S3.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={sandboxUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-ds bg-accent px-5 py-3.5 text-[15px] font-medium transition-colors hover:bg-accent-hover"
          >
            Открыть Apollo Sandbox{' '}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          {[
            ['API', API_REPO],
            ['Клиент', CLIENT_REPO],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-ds border border-[#3a3d42] px-4.5 py-3.5 text-[15px] transition-colors hover:border-fg-inverse"
            >
              <GithubIcon className="size-4" /> {label}
            </a>
          ))}
        </div>
      </div>

      <figure className="flex min-w-0 flex-col overflow-hidden rounded-ds border border-border-inverse bg-surface-code">
        <figcaption className="flex items-center justify-between gap-4 border-b border-border-inverse px-5 py-3.5">
          <span className="caption text-fg-inverse-secondary normal-case">
            {operationName}.graphql
          </span>
          <span className="caption text-success normal-case" aria-live="polite">
            {timing ? `● 200 · 8 SQL · ${timing.durationMs} мс` : '● …'}
          </span>
        </figcaption>
        <pre className="overflow-x-auto p-6 font-mono text-sm leading-[1.6] text-[#e6e8eb]">
          <code>{query}</code>
        </pre>
        <p className="caption border-t border-border-inverse px-5 py-3 text-fg-inverse-muted normal-case">
          + {fragmentCount} фрагментов рядом с компонентами · data masking
          включён
        </p>
      </figure>
    </section>
  );
}
