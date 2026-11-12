import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
      <ArrowUpRight
        className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
