import type { FragmentType } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import { SkillsSection_ProfileFragmentDoc } from '../../__generated__/graphql.ts';
import { SectionHeader } from '../../components/SectionHeader.tsx';
import { plural } from '../../lib/format.ts';
import { groupSkills } from '../../lib/skill-categories.ts';

export function SkillsSection({
  profile,
}: {
  profile: FragmentType<typeof SkillsSection_ProfileFragmentDoc>;
}) {
  const { data, complete } = useFragment({
    fragment: SkillsSection_ProfileFragmentDoc,
    fragmentName: 'SkillsSection_profile',
    from: profile,
  });
  if (!complete) return null;

  const groups = groupSkills(data.skills);
  const total = data.skills.length;
  return (
    <section
      aria-labelledby="skills"
      className="flex flex-col gap-10 bg-surface-muted px-5 py-20 md:px-16 md:py-24"
    >
      <SectionHeader
        id="skills"
        index="03 / Навыки"
        title="Навыки"
        meta={`${total} ${plural(total, ['навык', 'навыка', 'навыков'])} · ${groups.length} ${plural(groups.length, ['категория', 'категории', 'категорий'])}`}
      />
      <dl>
        {groups.map((group) => (
          <div
            key={group.category}
            className="grid gap-2 border-b border-border-strong py-5 md:grid-cols-[200px_1fr] md:gap-12"
          >
            <dt className="caption pt-1.5 text-fg-secondary">{group.label}</dt>
            <dd className="text-[19px] leading-[1.45] md:text-[22px]">
              {group.skills.map((s) => s.name).join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
