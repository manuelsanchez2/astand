/**
 * Tries to clone the state. First uses structuredClone; if that fails (for reactive proxies),
 * falls back to JSON serialization for simple serializable states.
 *
 * @template T - The type of the state.
 * @param state - The state to clone.
 * @returns A clone of the state.
 */
export function cloneState<T>(state: T): T {
	try {
		return structuredClone(state);
	} catch (e) {
		// Fallback: use JSON serialization (works only for serializable state)
		try {
			return JSON.parse(JSON.stringify(state));
		} catch (e2) {
			console.error('Failed to clone state:', e2);
			throw e2;
		}
	}
}