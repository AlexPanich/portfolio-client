import { useQuery } from '@apollo/client/react';
import { print } from 'graphql';
import { BusinessCardDocument } from '../../__generated__/graphql.ts';
import { SectionBoundary } from '../../components/SectionBoundary.tsx';
import { ExperienceSection } from './ExperienceSection.tsx';
import { Footer } from './Footer.tsx';
import { Hero } from './Hero.tsx';
import { HowItWorks } from './HowItWorks.tsx';
import { Nav } from './Nav.tsx';
import { ProjectsSection } from './ProjectsSection.tsx';
import { SkillsSection } from './SkillsSection.tsx';
import { ErrorState, LoadingState } from './StateViews.tsx';

/** The operation as written (fragment definitions omitted) for the demo block. */
const PAGE_QUERY = print(BusinessCardDocument.definitions[0]);
const FRAGMENT_COUNT = BusinessCardDocument.definitions.length - 1;

/** One query per page; every section reads its own fragment from the cache. */
export function BusinessCardPage({ sandboxUrl }: { sandboxUrl: string }) {
  const { data, loading, error, refetch } = useQuery(BusinessCardDocument);

  if (loading) return <LoadingState />;
  if (error)
    return (
      <ErrorState message={error.message} onRetry={() => void refetch()} />
    );
  if (!data?.profile)
    return (
      <ErrorState message="Профиль не найден" onRetry={() => void refetch()} />
    );

  const { profile } = data;
  return (
    <>
      <Nav profile={profile} />
      <main>
        <SectionBoundary name="Профиль">
          <Hero profile={profile} />
        </SectionBoundary>
        <SectionBoundary name="Опыт">
          <ExperienceSection profile={profile} />
        </SectionBoundary>
        <SectionBoundary name="Проекты">
          <ProjectsSection profile={profile} />
        </SectionBoundary>
        <SectionBoundary name="Навыки">
          <SkillsSection profile={profile} />
        </SectionBoundary>
        <HowItWorks
          query={PAGE_QUERY}
          operationName="BusinessCard"
          fragmentCount={FRAGMENT_COUNT}
          sandboxUrl={sandboxUrl}
        />
      </main>
      <Footer profile={profile} />
    </>
  );
}
