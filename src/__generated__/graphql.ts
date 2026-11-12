/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/** Kind of resource a link points to; lets clients pick an icon. */
export type LinkType =
  'EMAIL' | 'GITHUB' | 'LINKEDIN' | 'OTHER' | 'TELEGRAM' | 'WEBSITE';

/** Area a skill belongs to; used to group skills in a CV. */
export type SkillCategory =
  | 'AI'
  | 'API'
  | 'ARCHITECTURE'
  | 'BACKEND'
  | 'CLOUD'
  | 'DATABASE'
  | 'DEVOPS'
  | 'FRONTEND'
  | 'LANGUAGE'
  | 'OTHER'
  | 'TESTING'
  | 'TOOLING';

export type BusinessCardQueryVariables = Exact<{ [key: string]: never }>;

export type BusinessCardQuery = {
  profile:
    | ({ __typename: 'Profile'; id: string } & {
        ' $fragmentRefs'?: {
          Nav_ProfileFragment: Nav_ProfileFragment;
          Hero_ProfileFragment: Hero_ProfileFragment;
          ExperienceSection_ProfileFragment: ExperienceSection_ProfileFragment;
          ProjectsSection_ProfileFragment: ProjectsSection_ProfileFragment;
          SkillsSection_ProfileFragment: SkillsSection_ProfileFragment;
          Footer_ProfileFragment: Footer_ProfileFragment;
        };
      })
    | null;
};

export type ExperienceItem_ExperienceFragment = {
  __typename: 'Experience';
  id: string;
  company: string;
  companyUrl: string | null;
  position: string;
  location: string | null;
  description: string | null;
  achievements: Array<string>;
  period: {
    __typename: 'Period';
    startDate: string;
    endDate: string | null;
    duration: { __typename: 'Duration'; years: number; months: number };
  };
  technologies: Array<{ __typename: 'Skill'; id: string; name: string }>;
} & { ' $fragmentName'?: 'ExperienceItem_ExperienceFragment' };

export type ExperienceSection_ProfileFragment = {
  __typename: 'Profile';
  id: string;
  totalExperience: { __typename: 'Duration'; years: number; months: number };
  experience: Array<
    { __typename: 'Experience'; id: string } & {
      ' $fragmentRefs'?: {
        ExperienceItem_ExperienceFragment: ExperienceItem_ExperienceFragment;
      };
    }
  >;
} & { ' $fragmentName'?: 'ExperienceSection_ProfileFragment' };

export type Footer_ProfileFragment = {
  __typename: 'Profile';
  id: string;
  name: string;
} & { ' $fragmentName'?: 'Footer_ProfileFragment' };

export type Hero_ProfileFragment = {
  __typename: 'Profile';
  id: string;
  name: string;
  headline: string;
  description: string;
  location: string | null;
  avatar: { __typename: 'Image'; url: string } | null;
  totalExperience: { __typename: 'Duration'; years: number; months: number };
  links: Array<{
    __typename: 'ProfileLink';
    id: string;
    type: LinkType;
    label: string;
    url: string;
  }>;
  experience: Array<{ __typename: 'Experience'; id: string }>;
  projects: Array<{ __typename: 'Project'; id: string }>;
  skills: Array<{ __typename: 'Skill'; id: string }>;
} & { ' $fragmentName'?: 'Hero_ProfileFragment' };

export type Nav_ProfileFragment = {
  __typename: 'Profile';
  id: string;
  links: Array<{
    __typename: 'ProfileLink';
    id: string;
    type: LinkType;
    url: string;
  }>;
} & { ' $fragmentName'?: 'Nav_ProfileFragment' };

export type ProjectsSection_ProfileFragment = {
  __typename: 'Profile';
  id: string;
  projects: Array<
    { __typename: 'Project'; id: string } & {
      ' $fragmentRefs'?: {
        ProjectItem_ProjectFragment: ProjectItem_ProjectFragment;
      };
    }
  >;
} & { ' $fragmentName'?: 'ProjectsSection_ProfileFragment' };

export type ProjectItem_ProjectFragment = {
  __typename: 'Project';
  id: string;
  name: string;
  description: string;
  url: string | null;
  repositoryUrl: string | null;
  technologies: Array<{ __typename: 'Skill'; id: string; name: string }>;
} & { ' $fragmentName'?: 'ProjectItem_ProjectFragment' };

export type SkillsSection_ProfileFragment = {
  __typename: 'Profile';
  id: string;
  skills: Array<{
    __typename: 'Skill';
    id: string;
    name: string;
    category: SkillCategory;
  }>;
} & { ' $fragmentName'?: 'SkillsSection_ProfileFragment' };

export const ExperienceItem_ExperienceFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExperienceItem_experience' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Experience' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companyUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'position' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'achievements' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'period' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'duration' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'years' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'months' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'technologies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ExperienceItem_ExperienceFragment, unknown>;
export const ExperienceSection_ProfileFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExperienceSection_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalExperience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'years' } },
                { kind: 'Field', name: { kind: 'Name', value: 'months' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'experience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExperienceItem_experience' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExperienceItem_experience' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Experience' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companyUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'position' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'achievements' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'period' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'duration' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'years' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'months' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'technologies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ExperienceSection_ProfileFragment, unknown>;
export const Footer_ProfileFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Footer_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Footer_ProfileFragment, unknown>;
export const Hero_ProfileFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Hero_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'headline' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalExperience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'years' } },
                { kind: 'Field', name: { kind: 'Name', value: 'months' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'links' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'experience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projects' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Hero_ProfileFragment, unknown>;
export const Nav_ProfileFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Nav_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'links' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Nav_ProfileFragment, unknown>;
export const ProjectItem_ProjectFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectItem_project' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Project' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repositoryUrl' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'technologies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectItem_ProjectFragment, unknown>;
export const ProjectsSection_ProfileFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectsSection_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projects' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProjectItem_project' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectItem_project' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Project' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repositoryUrl' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'technologies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectsSection_ProfileFragment, unknown>;
export const SkillsSection_ProfileFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SkillsSection_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SkillsSection_ProfileFragment, unknown>;
export const BusinessCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BusinessCard' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Nav_profile' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Hero_profile' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExperienceSection_profile' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProjectsSection_profile' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'SkillsSection_profile' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Footer_profile' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExperienceItem_experience' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Experience' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companyUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'position' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'achievements' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'period' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'duration' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'years' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'months' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'technologies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectItem_project' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Project' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repositoryUrl' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'technologies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Nav_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'links' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Hero_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'headline' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalExperience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'years' } },
                { kind: 'Field', name: { kind: 'Name', value: 'months' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'links' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'experience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projects' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExperienceSection_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalExperience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'years' } },
                { kind: 'Field', name: { kind: 'Name', value: 'months' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'experience' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExperienceItem_experience' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectsSection_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projects' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProjectItem_project' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SkillsSection_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Footer_profile' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Profile' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BusinessCardQuery, BusinessCardQueryVariables>;
