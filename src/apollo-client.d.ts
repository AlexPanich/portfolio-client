import type { GraphQLCodegenDataMasking } from '@apollo/client/masking';

// Lets Apollo Client understand codegen's masked fragment types.
declare module '@apollo/client' {
  export interface TypeOverrides
    extends GraphQLCodegenDataMasking.TypeOverrides {}
}
