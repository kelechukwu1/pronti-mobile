import { ENVIRONMENT } from '@/config';

/** Resolve after `ms` milliseconds. */
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/** A latency within the configured mock range. */
export function randomLatency(): number {
  const { MIN_LATENCY_MS, MAX_LATENCY_MS } = ENVIRONMENT.MOCK;
  return Math.floor(
    MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS),
  );
}

/** True with probability `rate` (0..1). */
export function rollFailure(rate: number): boolean {
  return Math.random() < rate;
}

/** Pick a random element from a non-empty list. */
export function pickOne<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
