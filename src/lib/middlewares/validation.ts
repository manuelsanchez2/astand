import type { Middleware } from "$lib/index.js";

export type ValidationCondition<T> = {
    predicate: (state: T) => boolean;
    message: string;
    level?: 'log' | 'warn' | 'error' | string;
  };
  
  /**
   * Validation middleware.
   *
   * Checks each condition against the new state. If a condition fails,
   * logs, warns, or throws an error (if level is 'error').
   *
   * @template T - The type of the state.
   * @param conditions - An array of validation conditions.
   * @returns A middleware function.
   */
  export function validationMiddleware<T>(conditions: ValidationCondition<T>[]): Middleware<T> {
    return (prevState: T, nextState: T) => {
      for (const condition of conditions) {
        if (!condition.predicate(nextState)) {
          const level = condition.level || 'error';
          const msg = condition.message;
          if (level === 'warn') {
            console.warn(msg);
          } else if (level === 'log') {
            console.log(msg);
          } else {
            // Throw an error to block the update.
            throw new Error(msg);
          }
        }
      }
    };
  }
  