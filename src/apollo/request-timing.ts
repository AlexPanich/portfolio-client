import { ApolloLink } from '@apollo/client';
import { useSyncExternalStore } from 'react';
import { tap } from 'rxjs';

export interface RequestTiming {
  operationName: string;
  durationMs: number;
}

/**
 * Tiny external store for the last measured request, read by the
 * "how it works" block. Kept outside React and Apollo state on purpose:
 * it is diagnostics, not application data.
 */
let last: RequestTiming | null = null;
const listeners = new Set<() => void>();

function publish(timing: RequestTiming): void {
  last = timing;
  listeners.forEach((notify) => notify());
}

export function useLastRequestTiming(): RequestTiming | null {
  return useSyncExternalStore(
    (notify) => {
      listeners.add(notify);
      return () => listeners.delete(notify);
    },
    () => last,
  );
}

/** Measures wall-clock time of every operation, including retries. */
export const requestTimingLink = new ApolloLink((operation, forward) => {
  const startedAt = performance.now();
  return forward(operation).pipe(
    tap({
      complete: () =>
        publish({
          operationName: operation.operationName ?? 'anonymous',
          durationMs: Math.round(performance.now() - startedAt),
        }),
    }),
  );
});
