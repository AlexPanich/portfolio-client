import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * Types for every operation and fragment, generated from the live API schema.
 * The output is committed, so building the client needs no network access;
 * re-run `npm run codegen` after the API schema changes.
 */
const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.SCHEMA_URL ?? 'https://portfolio-api-z17b.onrender.com/graphql',
  // Operations and fragments live in .graphql files next to their components.
  documents: ['src/**/*.graphql'],
  generates: {
    './src/__generated__/graphql.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        avoidOptionals: { field: true, inputValue: false },
        defaultScalarType: 'unknown',
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        enumsAsTypes: true,
        useTypeImports: true,
        // Apollo Client data masking: fragment spreads stay opaque in parents.
        inlineFragmentTypes: 'mask',
        customDirectives: { apolloUnmask: true },
        scalars: {
          Date: 'string',
          DateTime: 'string',
          URL: 'string',
        },
      },
    },
  },
};

export default config;
