# Portfolio Client — демо-клиент цифровой визитки

Одностраничный клиент на **React + Apollo Client** для [portfolio-api](https://github.com/AlexPanich/portfolio-api) (NestJS · GraphQL · Prisma · PostgreSQL · S3). Дизайн сделан в [Pencil](https://pen.dev), исходник — [`design/portfolio.pen`](./design).

| | |
|---|---|
| Демо | **https://portfolio-client-m3oz.onrender.com** |
| API (Apollo Sandbox) | https://portfolio-api-z17b.onrender.com/graphql |

На демо S3 не подключён, поэтому вместо фото показывается монограмма. Первый запрос после простоя может идти до минуты: API на бесплатном тарифе просыпается, и клиент об этом сообщает.

**Стек:** React 19 · Apollo Client 4 · GraphQL Code Generator · TypeScript · Vite 8 · Tailwind CSS 4 · Vitest + Testing Library

## Запуск

```bash
# 1. API с базой и S3 (из соседнего репозитория)
cd ../portfolio && docker compose up --build -d

# 2. Клиент
cd ../portfolio-client
npm install
npm run dev            # http://localhost:5173
```

Адрес API задаётся через `VITE_API_URL`: `.env.development` указывает на локальный API, `.env.production` — на прод.

| Команда | Назначение |
|---|---|
| `npm test` | unit- и интеграционные тесты |
| `npm run codegen` | перегенерировать типы из схемы API (`SCHEMA_URL` переопределяет адрес) |
| `npm run lint` / `typecheck` / `format:check` | статический анализ |
| `npm run build` | production-сборка в `dist/` |

## Как устроено

### Один запрос на страницу, фрагменты рядом с компонентами

Страница делает ровно один запрос `BusinessCard`. Он собран из фрагментов, и каждый фрагмент лежит в `.graphql`-файле рядом со своим компонентом:

```
features/business-card/
├── BusinessCardPage.graphql   query BusinessCard { profile { ...Hero_profile ...ExperienceSection_profile … } }
├── Hero.graphql / Hero.tsx    fragment Hero_profile on Profile { name avatar { url } … }
├── ExperienceSection.graphql  fragment ExperienceSection_profile { experience { ...ExperienceItem_experience } }
├── ExperienceItem.graphql     fragment ExperienceItem_experience on Experience { … }
└── …
```

- Компонент сам объявляет нужные ему поля, поэтому, чтобы добавить поле, достаточно поправить его фрагмент. Запрос страницы трогать не нужно, а лишних данных он не получит.
- **Data masking** (`dataMasking: true`): родитель получает непрозрачную ссылку на фрагмент и физически не может прочитать чужие поля. Секции читают свои данные через `useFragment` из нормализованного кэша. Границы между компонентами проверяет TypeScript.
- **GraphQL Code Generator** генерирует `TypedDocumentNode` для каждого фрагмента и запроса из живой схемы API. Хуки выводят типы сами, без ручных дженериков. Результат закоммичен, поэтому сборке сеть не нужна.

Так же организован и бэкенд: связи профиля резолвятся через DataLoader, и весь запрос стоит 8 SQL-запросов при любом объёме данных.

### Сеть и состояния

- **Холодный старт Render.** Бесплатный инстанс API засыпает, и пока он просыпается, прокси отвечает 5xx. `RetryLink` повторяет запрос с экспоненциальной задержкой примерно минуту. Если загрузка дольше 2,5 с, интерфейс объясняет, что сервер просыпается.
- **Ошибка** показывается отдельным экраном с текстом и кнопкой «Повторить» (`refetch`). Каждая секция обёрнута в error boundary: баг рендера в одной секции не обнуляет страницу.
- **Замер запроса.** `requestTimingLink` измеряет время операции вместе с повторами, и блок «Как сделано» показывает реальную цифру.
- Значения без `id` (`Image`, `Duration`, `Period`) не нормализуются (`keyFields: false`) и хранятся внутри родителя.
- Фото приходит из приватного S3-бакета по подписанной ссылке. Если хранилище не подключено (`avatar: null`), вместо фото показывается монограмма.

### Дизайн → код

Макет desktop-страницы и экранов состояний сделан в Pencil. Токены (цвета, шрифты Geologica / Golos Text / IBM Plex Mono, скругления) перенесены в `@theme` Tailwind v4 (`src/index.css`), поэтому классы называются по ролям: `text-fg-secondary`, `bg-surface-muted`, `font-heading`. Вёрстка адаптивная: на мобильных фото уходит наверх, а колонки журналов складываются в одну.

## Тесты

- `lib/*.test.ts` — русские склонения и форматирование периодов и стажа, группировка навыков.
- `BusinessCardPage.test.tsx` — страница целиком на **реальной конфигурации кэша с data masking**, сеть заменена `MockLink`. Проверяются загрузка, все секции, ссылки из данных (кнопка e-mail исчезает, если ссылки нет) и путь ошибка → «Повторить» → данные. Фикстура типизирована как `Unmasked<BusinessCardQuery>`, поэтому изменение фрагмента без обновления теста не скомпилируется.

## Деплой

Статический сайт на Render, Blueprint — [`render.yaml`](./render.yaml). Ассеты отдаются с `Cache-Control: immutable`, потому что в их именах есть хеш.
