import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { requestTimingLink } from './request-timing.ts';

/** Shared by the app and tests, so tests exercise the real cache config. */
export function createCache(): InMemoryCache {
  return new InMemoryCache({
    typePolicies: {
      // Value objects without an id live inside their parent entity.
      Image: { keyFields: false },
      Duration: { keyFields: false },
      Period: { keyFields: false },
    },
  });
}

export function createApolloClient(uri: string): ApolloClient {
  return new ApolloClient({
    link: ApolloLink.from([
      requestTimingLink,
      // The demo API runs on a free Render instance that sleeps when idle:
      // while it wakes up the proxy answers with 5xx, so network errors are
      // retried with backoff for up to ~1 minute before giving up.
      new RetryLink({
        delay: { initial: 1000, max: 8000, jitter: true },
        attempts: { max: 10 },
      }),
      new HttpLink({ uri }),
    ]),
    cache: createCache(),
    // Components can read only the fields their own fragment asks for.
    dataMasking: true,
  });
}
