# CLAUDE.md — portfolio-client

Демо-клиент для `../portfolio` (API): React 19, Apollo Client 4, GraphQL Codegen, Vite 8, Tailwind 4. Дизайн — `design/portfolio.pen` (Pencil).

## Команды

```bash
npm run dev           # :5173, нужен API на :3000 (docker compose up в ../portfolio)
npm run codegen       # типы из схемы API; локальный API: SCHEMA_URL=http://localhost:3000/graphql npm run codegen
npm test              # vitest + Testing Library
npm run lint && npm run typecheck && npm run format && npm run build
```

## Соглашения

- **Один запрос на страницу** (`BusinessCardPage.graphql`), собранный из фрагментов. Фрагмент компонента лежит рядом в `Компонент.graphql` и называется `Компонент_проп` (`Hero_profile`).
- **Data masking включён:** компонент читает только свой фрагмент через `useFragment({ fragment: XFragmentDoc, fragmentName: 'X_prop', from })`. `fragmentName` указывать всегда.
- Типы только из `src/__generated__/graphql.ts` (codegen, закоммичен); ручных дженериков у хуков нет.
- Стили — Tailwind-классы на токенах из `@theme` в `src/index.css` (`text-fg-secondary`, `bg-surface-muted`, `font-heading`, утилита `caption`). Хардкод цветов не используем.
- Новая секция оборачивается в `SectionBoundary` в `BusinessCardPage.tsx`.

## Рецепт: новое поле или секция

1. В API добавить поле → в клиенте `npm run codegen` (против локального API — см. выше).
2. Поле во фрагмент компонента (`.graphql`) → `npm run codegen` → использовать в компоненте.
3. Новая секция: `X.graphql` (фрагмент на `Profile`) + `X.tsx` (`useFragment`) + spread `...X_profile` в `BusinessCardPage.graphql` + рендер в `BusinessCardPage.tsx`.
4. Обновить фикстуру в `BusinessCardPage.test.tsx`: она типизирована `Unmasked<BusinessCardQuery>`, TypeScript подскажет недостающие поля.
