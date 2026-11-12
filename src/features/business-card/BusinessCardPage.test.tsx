import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import type { Unmasked } from '@apollo/client/masking';
import { MockLink } from '@apollo/client/testing';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  BusinessCardDocument,
  type BusinessCardQuery,
} from '../../__generated__/graphql.ts';
import { createCache } from '../../apollo/client.ts';
import { BusinessCardPage } from './BusinessCardPage.tsx';

type Mock = MockLink.MockedResponse<BusinessCardQuery>;
/** Full (unmasked) shape: the fixture must satisfy every fragment. */
type Profile = NonNullable<Unmasked<BusinessCardQuery>['profile']>;

const profile: Profile = {
  __typename: 'Profile',
  id: 'p1',
  name: 'Александр Паниченко',
  headline: 'Fullstack-разработчик · TypeScript',
  description: 'Пишу на TypeScript.',
  location: 'Москва',
  avatar: {
    __typename: 'Image',
    url: 'https://s3.test/avatars/abc.jpg?sig=1',
  },
  totalExperience: { __typename: 'Duration', years: 10, months: 1 },
  links: [
    {
      __typename: 'ProfileLink',
      id: 'l1',
      type: 'TELEGRAM',
      label: 'Telegram',
      url: 'https://t.me/test',
    },
    {
      __typename: 'ProfileLink',
      id: 'l2',
      type: 'GITHUB',
      label: 'GitHub',
      url: 'https://github.com/test',
    },
  ],
  skills: [
    { __typename: 'Skill', id: 's1', name: 'TypeScript', category: 'LANGUAGE' },
    { __typename: 'Skill', id: 's2', name: 'NestJS', category: 'BACKEND' },
  ],
  experience: [
    {
      __typename: 'Experience',
      id: 'e1',
      company: 'Evrone',
      companyUrl: 'https://evrone.ru',
      position: 'Frontend-разработчик',
      location: 'Воронеж',
      description: 'Проект «БлагоДаря».',
      achievements: ['Сделал сценарий создания целевого капитала.'],
      period: {
        __typename: 'Period',
        startDate: '2026-02-01',
        endDate: '2026-06-01',
        duration: { __typename: 'Duration', years: 0, months: 5 },
      },
      technologies: [{ __typename: 'Skill', id: 's1', name: 'TypeScript' }],
    },
  ],
  projects: [
    {
      __typename: 'Project',
      id: 'pr1',
      name: 'Portfolio API',
      description: 'GraphQL API на NestJS.',
      url: null,
      repositoryUrl: 'https://github.com/test/portfolio-api',
      technologies: [{ __typename: 'Skill', id: 's2', name: 'NestJS' }],
    },
  ],
};

const success: Mock = {
  request: { query: BusinessCardDocument },
  result: { data: { profile } },
};

const failure: Mock = {
  request: { query: BusinessCardDocument },
  error: new Error('Failed to fetch'),
};

/** Real cache config and data masking, network replaced by MockLink. */
function renderPage(mocks: Mock[]) {
  const client = new ApolloClient({
    link: new MockLink(mocks),
    cache: createCache(),
    dataMasking: true,
  });
  return render(
    <ApolloProvider client={client}>
      <BusinessCardPage sandboxUrl="https://api.test/graphql" />
    </ApolloProvider>,
  );
}

describe('BusinessCardPage', () => {
  it('shows a loading state, then every section from one query', async () => {
    renderPage([success]);

    expect(screen.getByRole('status')).toHaveTextContent('Загружаем данные');

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Александр Паниченко',
    );
    expect(
      screen.getByRole('img', { name: 'Александр Паниченко' }),
    ).toHaveAttribute('src', profile.avatar!.url);

    const experience = screen.getByRole('region', { name: 'Опыт работы' });
    expect(within(experience).getByText('Evrone')).toBeInTheDocument();
    expect(
      within(experience).getByText('фев 2026 — июн 2026'),
    ).toBeInTheDocument();
    expect(within(experience).getByText('5 мес')).toBeInTheDocument();

    const projects = screen.getByRole('region', { name: 'Проекты' });
    expect(within(projects).getByRole('link', { name: /Код/ })).toHaveAttribute(
      'href',
      'https://github.com/test/portfolio-api',
    );
    expect(within(projects).queryByRole('link', { name: /Демо/ })).toBeNull();

    const skills = screen.getByRole('region', { name: 'Навыки' });
    expect(within(skills).getByText('Языки')).toBeInTheDocument();
    expect(within(skills).getByText('NestJS')).toBeInTheDocument();

    // The demo block shows the real operation, composed of fragments.
    expect(
      screen.getByText(/\.\.\.ExperienceSection_profile/),
    ).toBeInTheDocument();
  });

  it('builds the contact actions from profile links', async () => {
    renderPage([success]);
    const telegram = await screen.findAllByRole('link', {
      name: /Написать в Telegram/,
    });
    telegram.forEach((link) =>
      expect(link).toHaveAttribute('href', 'https://t.me/test'),
    );
    // No EMAIL link in the data -> no e-mail button.
    expect(screen.queryByRole('link', { name: /E-mail/ })).toBeNull();
  });

  it('shows the error state and recovers on retry', async () => {
    renderPage([failure, success]);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Не удалось загрузить данные');
    expect(alert).toHaveTextContent('Failed to fetch');

    await userEvent.click(screen.getByRole('button', { name: /Повторить/ }));

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Александр Паниченко',
    );
  });
});
