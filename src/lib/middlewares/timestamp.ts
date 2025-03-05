/**
 * Timestamp middleware.
 *
 * Adds/updates an `updatedAt` property on the state with the current ISO timestamp
 * whenever the state is updated.
 *
 * @template T - The type of the state. (Should be an object.)
 * @param prevState - The state before the update.
 * @param nextState - The state after the update.
 */
export function timestampMiddleware<T extends object>(prevState: T, nextState: T): void {
	// We cast to 'any' because we're adding a property that may not exist on T.
	(nextState as any).updatedAt = new Date().toISOString();
}
