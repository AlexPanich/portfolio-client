import type { FragmentType } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import {
  ProjectItem_ProjectFragmentDoc,
  ProjectsSection_ProfileFragmentDoc,
} from '../../__generated__/graphql.ts';
import { ExternalLink } from '../../components/ExternalLink.tsx';
import { SectionHeader } from '../../components/SectionHeader.tsx';

function ProjectItem({
  project,
  index,
}: {
  project: FragmentType<typeof ProjectItem_ProjectFragmentDoc>;
  index: number;
}) {
  const { data, complete } = useFragment({
    fragment: ProjectItem_ProjectFragmentDoc,
    fragmentName: 'ProjectItem_project',
    from: project,
  });
  if (!complete) return null;

  return (
    <li className="grid gap-4 border-t border-border py-8 md:grid-cols-[200px_1fr_auto] md:gap-12">
      <span className="font-mono text-sm text-fg">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-[28px] leading-tight font-medium tracking-[-0.02em] md:text-[32px]">
          {data.name}
        </h3>
        <p className="max-w-[640px] leading-[1.55] text-fg-secondary">
          {data.description}
        </p>
        <p className="font-mono text-xs tracking-[0.03em] text-fg-muted">
          {data.technologies.map((t) => t.name).join(' · ')}
        </p>
      </div>
      <div className="flex items-center gap-5 md:pt-2">
        {data.url && <ExternalLink href={data.url}>Демо</ExternalLink>}
        {data.repositoryUrl && (
          <ExternalLink href={data.repositoryUrl}>Код</ExternalLink>
        )}
      </div>
    </li>
  );
}

export function ProjectsSection({
  profile,
}: {
  profile: FragmentType<typeof ProjectsSection_ProfileFragmentDoc>;
}) {
  const { data, complete } = useFragment({
    fragment: ProjectsSection_ProfileFragmentDoc,
    fragmentName: 'ProjectsSection_profile',
    from: profile,
  });
  if (!complete) return null;

  return (
    <section
      aria-labelledby="projects"
      className="flex flex-col gap-10 px-5 py-16 md:px-16 md:py-20"
    >
      <SectionHeader
        id="projects"
        index="02 / Проекты"
        title="Проекты"
        meta="Публичные репозитории на GitHub"
      />
      <ol>
        {data.projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </ol>
    </section>
  );
}
