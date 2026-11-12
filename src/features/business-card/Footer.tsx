import type { FragmentType } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import { Footer_ProfileFragmentDoc } from '../../__generated__/graphql.ts';

const YEAR = new Date().getFullYear();

export function Footer({
  profile,
}: {
  profile: FragmentType<typeof Footer_ProfileFragmentDoc>;
}) {
  const { data } = useFragment({
    fragment: Footer_ProfileFragmentDoc,
    fragmentName: 'Footer_profile',
    from: profile,
  });
  return (
    <footer className="flex flex-col gap-2 border-t border-border-inverse bg-surface-inverse px-5 py-7 md:flex-row md:justify-between md:px-16">
      <span className="caption text-fg-inverse-muted">
        © {YEAR} {data.name}
      </span>
      <span className="caption text-fg-inverse-muted">
        React · Apollo Client · NestJS · Prisma · PostgreSQL · S3
      </span>
    </footer>
  );
}
