import type { Middleware } from "$lib/store.svelte.js";

/**
 * Debug middleware.
 *
 * Accepts optional callbacks to run before and after the state change.
 *
 * @template T - The type of the state.
 * @param beforeChange - A callback that receives the previous state before the change.
 * @param afterChange - A callback that receives the new state after the change.
 * @returns A middleware function.
 */
export function debugMiddleware<T>(
    beforeChange?: (prevState: T) => void,
    afterChange?: (nextState: T) => void
  ): Middleware<T> {
    return (prevState: T, nextState: T) => {
      if (beforeChange) {
        try {
          beforeChange(prevState);
        } catch (err) {
          console.error('Error in beforeChange callback:', err);
        }
      }
      // (You might log or do something else here.)
      if (afterChange) {
        try {
          afterChange(nextState);
        } catch (err) {
          console.error('Error in afterChange callback:', err);
        }
      }
    };
  }
  