import type { FragmentType } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import { ExperienceSection_ProfileFragmentDoc } from '../../__generated__/graphql.ts';
import { SectionHeader } from '../../components/SectionHeader.tsx';
import { formatDuration, plural } from '../../lib/format.ts';
import { ExperienceItem } from './ExperienceItem.tsx';

export function ExperienceSection({
  profile,
}: {
  profile: FragmentType<typeof ExperienceSection_ProfileFragmentDoc>;
}) {
  const { data, complete } = useFragment({
    fragment: ExperienceSection_ProfileFragmentDoc,
    fragmentName: 'ExperienceSection_profile',
    from: profile,
  });
  if (!complete) return null;

  const count = data.experience.length;
  return (
    <section
      aria-labelledby="experience"
      className="flex flex-col gap-10 px-5 pt-20 pb-16 md:px-16 md:pt-30 md:pb-20"
    >
      <SectionHeader
        id="experience"
        index="01 / Опыт"
        title="Опыт работы"
        meta={`${count} ${plural(count, ['позиция', 'позиции', 'позиций'])} · ${formatDuration(data.totalExperience)}`}
      />
      <ol className="flex flex-col gap-10">
        {data.experience.map((item) => (
          <ExperienceItem key={item.id} experience={item} />
        ))}
      </ol>
    </section>
  );
}
