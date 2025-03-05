import type { Middleware } from "$lib/index.js";

/**
 * Throttle middleware.
 * Work in progress
 *
 * Logs a warning if state updates occur too frequently (i.e. less than `threshold` ms apart).
 *
 * @template T - The type of the state.
 * @param threshold - The minimum time (in ms) allowed between updates.
 * @returns A middleware function.
 */
export function throttleMiddleware<T>(threshold: number): Middleware<T> {
    let lastUpdate = 0;
    return (prevState: T, nextState: T) => {
      const now = Date.now();
      if (now - lastUpdate < threshold) {
        console.warn(
          `Throttle: Update occurred too soon (${now - lastUpdate}ms < ${threshold}ms threshold).`
        );
      } else {
        lastUpdate = now;
        console.log(`Throttle: Update allowed after ${now - lastUpdate}ms.`);
      }
    };
  }
  